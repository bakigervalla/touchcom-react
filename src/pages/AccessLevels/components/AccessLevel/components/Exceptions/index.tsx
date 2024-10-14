import { Button, Flex, Modal, Text, Title, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { Loaders, NotFound, Table } from '@/components';
import { accessLevel } from '@/data';
import { NotFoundExceptionIcon } from '@/icons';

import { pagination } from '@/common/constants';
import { AccessException, AccessLevel } from '@/common/models';

import columns from './columns';
import { Details, ExceptionForm } from './components';
import useStyles from './useStyles';

const DIALOG_TYPE = {
  EXCEPTION_DETAILS: 'EXCEPTION_DETAILS',
  NEW_EXCEPTION: 'NEW_EXCEPTION',
};

interface ExceptionsProps {
  data: Partial<AccessLevel> | null;
  isNewAccessLevelCreation: boolean;
}

const Exceptions = ({ data, isNewAccessLevelCreation }: ExceptionsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [siteTitle, setSiteTitle] = useState(
    'dialogs.accessLevels.newException.title',
  );
  const [dialogType, setDialogType] = useState(DIALOG_TYPE.NEW_EXCEPTION);
  const [selectedException, setSelectedException] = useState<AccessException>(
    {} as AccessException,
  );
  const [currentPage, setCurrentPage] = useState(pagination.DEFAULT_PAGE);
  const {
    getAccessLevelExceptions,
    createAccessLevelException,
    updateAccessLevelException,
  } = accessLevel.actions();
  const { accessLevel: accessLevelData, areAccessLevelExceptionsLoading } =
    useRecoilValue(accessLevel.state.accessLevelAtom);

  const handleCreateOrUpdateException = useCallback(
    (data: Partial<AccessException>) => {
      if (!accessLevelData?.id) {
        return;
      }

      if (!data.id) {
        close();
        createAccessLevelException(accessLevelData.id, data);
        return;
      }

      updateAccessLevelException(accessLevelData.id, data);
    },
    [
      accessLevelData,
      close,
      createAccessLevelException,
      updateAccessLevelException,
    ],
  );

  const handleAddException = useCallback(() => {
    open();
    setSiteTitle('dialogs.accessLevels.newException.title');
    setDialogType(DIALOG_TYPE.NEW_EXCEPTION);
  }, [open]);

  const handleInfoClick = useCallback(
    (data: AccessException) => {
      open();
      setSiteTitle('dialogs.accessLevels.exceptionDetails.title');
      setDialogType(DIALOG_TYPE.EXCEPTION_DETAILS);
      setSelectedException(data);
    },
    [open],
  );

  useEffect(() => {
    if (data?.id) {
      getAccessLevelExceptions(data.id, {
        page: currentPage,
        pageSize: pagination.ACCESS_LEVELS.EXCEPTIONS.PAGE_SIZE,
      });
    }
  }, [currentPage, data?.id, getAccessLevelExceptions]);

  if (areAccessLevelExceptionsLoading) {
    return (
      <Flex pos="relative" h="100%">
        <Loaders.Overlay />
      </Flex>
    );
  }

  return (
    <Flex className={classes.exceptionsContainer}>
      <Flex direction="column" gap={6}>
        <Title order={5}>{t('tabs.accessLevels.exceptions.title')}</Title>
        <Text variant="subtitle" w="70%">
          {t('tabs.accessLevels.exceptions.subtitle')}
        </Text>
      </Flex>
      {!isNewAccessLevelCreation &&
      accessLevelData?.accessExceptions?.data.length ? (
        <Flex className={classes.contentContainer}>
          <Button
            variant="filter"
            className={clsx(classes.button, 'add')}
            rightIcon={<IconPlus size={18} />}
            onClick={handleAddException}
          >
            {t('buttons.addException')}
          </Button>
          <Table
            page={currentPage}
            pageCount={accessLevelData?.accessExceptions?.pageCount}
            pageSize={accessLevelData?.accessExceptions?.pageSize}
            handlePageChange={setCurrentPage}
            showHeader={false}
            enableBulkSelect={false}
            classNames={classes.table}
            columns={columns(classes, t, handleInfoClick)}
            data={accessLevelData?.accessExceptions?.data ?? []}
          />
        </Flex>
      ) : (
        <Flex className={classes.notFoundContainer}>
          <NotFound
            label="notFound.exceptions.label"
            description="notFound.exceptions.description"
            Icon={NotFoundExceptionIcon}
          />
          <Button
            className={classes.button}
            leftIcon={<IconPlus size={18} />}
            onClick={handleAddException}
            disabled={isNewAccessLevelCreation}
          >
            {t('buttons.addException')}
          </Button>
        </Flex>
      )}
      <Modal
        title={t(siteTitle)}
        size="auto"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        {dialogType === DIALOG_TYPE.NEW_EXCEPTION ? (
          <ExceptionForm
            handleSubmit={handleCreateOrUpdateException}
            onCancel={close}
          />
        ) : (
          <Details
            data={selectedException}
            closeEditDialog={close}
            accessLevelId={data?.id}
            handleUpdate={handleCreateOrUpdateException}
          />
        )}
      </Modal>
    </Flex>
  );
};

export default memo(Exceptions);
