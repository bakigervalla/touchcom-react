import { Flex, Modal, Switch, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import moment from 'moment';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { accessKey } from '@/data';

import { Details } from '@/pages/AccessKeys/Shared';

import { AccessKey, AccessKeyStatus } from '@/common/models';

import useStyles from './useStyles';

interface AccessKeyProps {
  data: Partial<AccessKey>;
}

const AccessKey = ({ data }: AccessKeyProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const { getAccessKey, updateAccessKey } = accessKey.actions();

  const openAccessKeyDetails = useCallback(() => {
    if (data?.id) {
      getAccessKey(data.id);
    }
    open();
  }, [data.id, getAccessKey, open]);

  return (
    <Flex className={classes.accessKeyContainer}>
      <Flex>
        <Text mr="auto">
          {data.name} {data.number ? `#${data.number}` : ''}
        </Text>
        <Switch
          checked={data.status === AccessKeyStatus.ACTIVE}
          onChange={() =>
            updateAccessKey({
              ...data,
              status:
                data.status === AccessKeyStatus.ACTIVE
                  ? AccessKeyStatus.INACTIVE
                  : AccessKeyStatus.ACTIVE,
            })
          }
        />
      </Flex>
      <Flex direction="column">
        <Text variant="subtitle">{t('page.users.validTo')}</Text>
        <Text>
          {data.validTo ? moment(data.validTo).format('DD/MM/YYYY') : '-'}
        </Text>
      </Flex>
      <Flex mt="auto" className="buttonContainer">
        <Text className="link" onClick={openAccessKeyDetails}>
          {t('common.details')}
        </Text>
      </Flex>
      <Modal
        title={t('page.accessKeys.accessKeyDetailsTitle')}
        size="auto"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        <Details onClose={close} filters={{}} />
      </Modal>
    </Flex>
  );
};

export default memo(AccessKey);
