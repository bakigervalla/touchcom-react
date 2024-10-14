import { Avatar, Flex, Select, Text, Tooltip } from '@mantine/core';
import { IconReload, IconUserMinus } from '@tabler/icons-react';
import { TFunction } from 'i18next';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Status } from '@/components';
import { ArrowDownIcon } from '@/icons';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { ResendUserInvitation, Role, User, UserStatus } from '@/common/models';
import { common } from '@/common/utils';

const columns = (
  navigate: NavigateFunction,
  classes: KeyPair<string>,
  t: TFunction,
  roles: Role[],
  updateUser: (user: Partial<User>) => void,
  handleRemoveAdmin: () => void,
  resendUserInvitation: (resendInvitationRequest: ResendUserInvitation) => void,
) => [
  {
    name: 'name',
    defaultFlex: 1,
    header: t('tables.users.cells.name'),
    render: ({ data }: CellRender<User>) => (
      <Flex
        className={classes.nameCell}
        onClick={() =>
          navigate(paths.build(paths.SITES_USERS_ID, data.id.toString()))
        }
      >
        <Avatar
          size="sm"
          radius="xl"
          src={
            data.imageUrl ||
            `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
          }
        />
        <Text>{common.getUserFullName(data)}</Text>
      </Flex>
    ),
  },
  {
    name: 'email',
    defaultFlex: 1,
    header: t('tables.users.cells.email'),
    render: ({ data }: CellRender<User>) => (
      <Text variant="subtitle">{data.email}</Text>
    ),
  },
  {
    name: 'status',
    defaultFlex: 0,
    header: t('tables.users.cells.status'),
    render: ({ data }: CellRender<User>) => <Status status={data.status} />,
  },
  {
    name: 'roles',
    defaultFlex: 1,
    header: t('tables.users.cells.role'),
    render: ({ data }: CellRender<User>) => (
      <Select
        data={roles.map((role) => ({
          label: role.name,
          value: role.id.toString(),
        }))}
        placeholder={t(
          'forms.device.data.configuration.placeholder.heartbeatInterval',
        )}
        onChange={(value: string) =>
          void updateUser({
            id: data.id,
            roleId: parseInt(value, 10),
          })
        }
        defaultValue={data.role.id.toString()}
        rightSection={<ArrowDownIcon size={18} />}
      />
    ),
  },
  {
    name: 'action',
    header: '',
    width: 100,
    render: ({ data }: CellRender<User>) => {
      const { email, status } = data;
      return (
        <Flex className={classes.cell}>
          <IconUserMinus className="icon" onClick={handleRemoveAdmin} />
          {status === UserStatus.PENDING && (
            <Tooltip label={t('common.resendInvitation')} position="left">
              <IconReload
                className="icon"
                onClick={() => resendUserInvitation({ email })}
              />
            </Tooltip>
          )}
        </Flex>
      );
    },
  },
];

export default columns;
