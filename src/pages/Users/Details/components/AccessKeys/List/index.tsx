import { Button, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AttachEntitySearch, NotFound } from '@/components';
import { accessKey } from '@/data';
import { NotFoundAccessKeyIcon } from '@/icons';

import { AccessKey as IAccessKey } from '@/common/models';

import { AccessKey } from '../components';

import useStyles from './useStyles';

interface ListProps {
  openAddKeyDialog: () => void;
  handleAccessKeyToAttachSearch: (search: string) => void;
}

const List = ({
  openAddKeyDialog,
  handleAccessKeyToAttachSearch,
}: ListProps) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { attachAccessKeyToUserAndDevice } = accessKey.actions();
  const { userAccessKeys, accessKeysNotConnectedToUser } = useRecoilValue(
    accessKey.state.accessKeyAtom,
  );

  return userAccessKeys && userAccessKeys.length > 0 ? (
    <>
      <AttachEntitySearch
        notFound={{
          label: 'notFound.keys.label',
          description: 'notFound.keys.attachKeyDescription',
          icon: NotFoundAccessKeyIcon,
        }}
        action={handleAccessKeyToAttachSearch}
        onItemSelect={(accessKey) =>
          attachAccessKeyToUserAndDevice(
            (accessKey as Partial<IAccessKey>)?.id ?? 0,
            parseInt(id ?? '0', 10),
          )
        }
        data={accessKeysNotConnectedToUser.map((data) => ({
          ...data,
          id: data.id,
          title: `${data.name} ${data.number ? `#${data.number}` : ''}`,
          imageUrl: '-',
          subtitle: data.tag,
        }))}
        placeholder="buttons.attachAccessKey"
        classNames={classes.attachAccessKeyInput}
      />
      <Flex gap={18}>
        {userAccessKeys.map((accessKey) => (
          <AccessKey key={accessKey.id} data={accessKey} />
        ))}
      </Flex>
    </>
  ) : (
    <Flex className={classes.notFoundContainer}>
      <NotFound
        label="notFound.keys.label"
        description="notFound.keys.description"
        Icon={NotFoundAccessKeyIcon}
      />
      <Button
        onClick={openAddKeyDialog}
        className={classes.button}
        rightIcon={<IconPlus size={18} />}
      >
        {t('page.users.addKey')}
      </Button>
    </Flex>
  );
};

export default memo(List);
