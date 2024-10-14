/* eslint-disable react/jsx-props-no-spreading */
import { Badge, Box, Flex, Select, Skeleton } from '@mantine/core';
import React, { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { role, user } from '@/data';
import { ArrowDownIcon } from '@/icons';

import { pagination as paginationConstants } from '@/common/constants';
import { UserStatus, UserType } from '@/common/models';
import { common, status } from '@/common/utils';

import useStyles from './useStyles';

interface StatusProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
}

const Status = forwardRef<HTMLDivElement, StatusProps>(
  ({ value, ...rest }: StatusProps, ref) => {
    const { t } = useTranslation();
    return (
      <Box ref={ref} {...rest}>
        <Badge variant={status.getStatusVariant(value)}>
          {t(status.getFormattedStatusName(value))}
        </Badge>
      </Box>
    );
  },
);
Status.displayName = 'Status';

const AdditionalInfo = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [currentPage] = useState(paginationConstants.DEFAULT_PAGE);
  const { getRoles } = role.actions();
  const { getUsers, updateUser } = user.actions();
  const { resident, isResidentLoading } = useRecoilValue(
    user.state.residentAtom,
  );
  const { companies, areCompaniesLoading } = useRecoilValue(
    user.state.companyAtom,
  );
  const { apartments, areApartmentsLoading } = useRecoilValue(
    user.state.apartmentAtom,
  );
  const { roles, areRolesLoading } = useRecoilValue(role.state.roleAtom);

  const isDataReady = useMemo(
    () =>
      areRolesLoading ||
      isResidentLoading ||
      areApartmentsLoading ||
      areCompaniesLoading,
    [
      areRolesLoading,
      isResidentLoading,
      areApartmentsLoading,
      areCompaniesLoading,
    ],
  );

  useEffect(() => {
    getUsers(
      {
        page: currentPage,
        pageSize: paginationConstants.USERS.PAGE_SIZE,
      },
      { search: '', type: UserType.COMPANY },
    );
  }, [currentPage, getUsers]);

  useEffect(() => {
    getUsers(
      {
        page: currentPage,
        pageSize: paginationConstants.USERS.PAGE_SIZE,
      },
      { search: '', type: UserType.APARTMENT },
    );
  }, [currentPage, getUsers]);

  useEffect(() => {
    getRoles({
      page: currentPage,
      pageSize: paginationConstants.ROLES.PAGE_SIZE,
    });
  }, [currentPage, getRoles]);

  return isDataReady ? (
    <Flex className={classes.additionalInfoContainer} pos="relative">
      <Flex w="15%" direction="column" gap={15}>
        <Skeleton height={12} radius="xl" />
        <Skeleton height={25} radius="xl" />
      </Flex>
      <Flex w="15%" direction="column" gap={15}>
        <Skeleton height={12} radius="xl" />
        <Skeleton height={25} radius="xl" />
      </Flex>
      <Flex w="15%" direction="column" gap={15}>
        <Skeleton height={12} radius="xl" />
        <Skeleton height={25} radius="xl" />
      </Flex>
      <Flex w="15%" direction="column" gap={15}>
        <Skeleton height={12} radius="xl" />
        <Skeleton height={25} radius="xl" />
      </Flex>
    </Flex>
  ) : (
    <Flex className={classes.additionalInfoContainer}>
      {resident?.type === UserType.RESIDENT && (
        <>
          <Select
            variant="underlined"
            data={apartments.map((apartment) => ({
              label: `#${apartment.number}, ${common.ordinalSuffixOf(
                apartment.floor,
              )} ${t('forms.user.data.label.floor').toLowerCase()}`,
              value: apartment.id.toString(),
            }))}
            label={t('forms.user.data.label.apartment')}
            placeholder="-"
            onChange={(value: UserStatus) =>
              updateUser({
                id: resident?.id,
                apartmentId: parseInt(value, 10),
              })
            }
            defaultValue={resident?.apartmentId?.toString() ?? '0'}
            rightSection={<ArrowDownIcon size={18} />}
          />
          <Select
            variant="underlined"
            data={companies.map((company) => ({
              label: `${company?.name ?? '-'}, ${common.ordinalSuffixOf(
                company.floor,
              )} ${t('forms.user.data.label.floor').toLowerCase()}`,
              value: company.id.toString(),
            }))}
            label={t('forms.user.data.label.company')}
            placeholder="-"
            onChange={(value: UserStatus) =>
              updateUser({
                id: resident?.id,
                companyId: parseInt(value, 10),
              })
            }
            defaultValue={resident?.companyId?.toString() ?? '0'}
            rightSection={<ArrowDownIcon size={18} />}
          />
        </>
      )}
      <Select
        variant="underlined"
        data={Object.values(UserStatus).map((userStatus) => ({
          label: t(status.getFormattedStatusName(userStatus)),
          value: userStatus,
        }))}
        label={t('forms.user.data.label.status')}
        placeholder={t('forms.user.data.placeholder.status')}
        itemComponent={Status}
        onChange={(value: UserStatus) =>
          updateUser({
            id: resident?.id,
            status: value,
          })
        }
        defaultValue={resident?.status}
        rightSection={<ArrowDownIcon size={18} />}
      />
      <Select
        variant="underlined"
        data={roles.map((role) => ({
          label: role.name,
          value: role.id.toString(),
        }))}
        label={t('forms.user.data.label.role')}
        placeholder={t('forms.user.data.placeholder.role')}
        onChange={(value: string) =>
          updateUser({
            id: resident?.id,
            roleId: parseInt(value, 10),
          })
        }
        defaultValue={resident?.role.id.toString()}
        rightSection={<ArrowDownIcon size={18} />}
      />
      <Select
        variant="underlined"
        data={[
          { label: 'Access Group #1', value: '1' },
          { label: 'Access Group #2', value: '2' },
          { label: 'Access Group #3', value: '3' },
          { label: 'Access Group #4', value: '4' },
          { label: 'Access Group #5', value: '5' },
        ]}
        label={t('forms.user.data.label.accessLevel')}
        placeholder={t('forms.user.data.placeholder.accessLevel')}
        onChange={() => null}
        defaultValue="1"
        rightSection={<ArrowDownIcon size={18} />}
      />
    </Flex>
  );
};

export default memo(AdditionalInfo);
