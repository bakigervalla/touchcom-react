import { Button, Flex, Modal, Title, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  EventFilter,
  Input,
  Layouts,
  Navigation,
  NotFound,
  Table,
  Wizard,
} from '@/components';
import { device } from '@/data';
import { ArrowDownIcon, FilterIcon, NotFoundDeviceIcon } from '@/icons';

import { pagination as paginationConstants } from '@/common/constants';
import { DeviceFilter, EventFilterItem } from '@/common/interfaces';
import { CreateDevice, DeviceType } from '@/common/models';

import columns from './columns';
import useStyles from './useStyles';

const List = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(
    paginationConstants.DEFAULT_PAGE,
  );
  const [activeFilter, setActiveFilter] = useState<DeviceFilter | undefined>(
    undefined,
  );
  const [opened, { open, close }] = useDisclosure(false);
  const { getDevices, registerDevice, getDevicesOverview } = device.actions();
  const { devices, devicesOverview, pagination, areDevicesLoading } =
    useRecoilValue(device.state.deviceAtom);

  const DEVICE_TYPE_FILTERS = useMemo(
    () => [
      {
        id: 1,
        key: 'ALL',
        label: t('page.devices.filters.allDevices'),
        value: devicesOverview?.totalDevices ?? 0,
      },
      {
        id: 2,
        key: DeviceType.VISITOR_PANEL,
        label: t('page.devices.filters.visitorPanels'),
        value: devicesOverview?.visitorPanels ?? 0,
      },
      {
        id: 3,
        key: DeviceType.DOOR,
        label: t('page.devices.filters.doors'),
        value: devicesOverview?.doors ?? 0,
      },
    ],
    [t, devicesOverview],
  );

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  const handleFilter = useCallback((filter: EventFilterItem) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setActiveFilter(
      filter.key !== 'ALL' ? { type: filter.key as DeviceType } : undefined,
    );
  }, []);

  const handleCreateDevice = useCallback(
    (values: CreateDevice) => {
      close();
      registerDevice(values);
    },
    [close, registerDevice],
  );

  useEffect(() => {
    getDevices(
      {
        page: currentPage,
        pageSize: paginationConstants.DEVICES.PAGE_SIZE,
      },
      { ...activeFilter, search },
    );
  }, [activeFilter, search, currentPage, getDevices]);

  useEffect(() => {
    getDevicesOverview();
  }, [getDevicesOverview]);

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.devices.title')]} />
      }
    >
      <Title order={3} className={classes.title}>
        {t('page.devices.title')}
      </Title>
      <EventFilter items={DEVICE_TYPE_FILTERS} onClick={handleFilter} />
      <Flex className={classes.actionsContainer}>
        <Input.Search action={handleSearch} />
        <Button
          variant="filter"
          className={clsx(classes.button, 'filter')}
          leftIcon={<FilterIcon size={18} />}
          rightIcon={<ArrowDownIcon size={16} />}
        >
          {t('common.filter')}
        </Button>
        <Button
          onClick={open}
          rightIcon={<IconPlus size={18} />}
          className={clsx(classes.button, 'create')}
        >
          {t('page.devices.newDevice')}
        </Button>
      </Flex>
      {!areDevicesLoading && devices.length > 0 ? (
        <Table
          columns={columns(navigate, classes, t)}
          data={devices}
          page={currentPage}
          enableBulkSelect={false}
          pageCount={pagination.pageCount}
          pageSize={pagination.pageSize}
          handlePageChange={setCurrentPage}
        />
      ) : (
        <Flex className={classes.notFoundContainer}>
          <NotFound
            label="notFound.devices.label"
            description="notFound.devices.description"
            Icon={NotFoundDeviceIcon}
          />
          <Button
            onClick={open}
            className={classes.button}
            rightIcon={<IconPlus size={18} />}
          >
            {t('page.devices.newDevice')}
          </Button>
        </Flex>
      )}
      <Modal
        title={t('page.devices.newDevice')}
        size="lg"
        centered
        opened={opened}
        onClose={close}
      >
        <Wizard.NewDevice
          handleClose={close}
          handleCreateDevice={handleCreateDevice}
        />
      </Modal>
    </Layouts.Page>
  );
};

export default memo(List);
