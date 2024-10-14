import { Button, Flex, Modal, Tabs, Title, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { isEmpty as _isEmpty } from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { Input, Layouts, Loaders, Navigation, Wizard } from '@/components';
import { user } from '@/data';
import {
  ApartmentIcon,
  ArrowDownIcon,
  CompanyIcon,
  FilterIcon,
  ImportIcon,
  UserIcon,
} from '@/icons';

import { pagination as paginationConstants } from '@/common/constants';
import { KeyPair, UserFilter } from '@/common/interfaces';
import { CreateUser, UserType } from '@/common/models';

import Apartments from '../Apartments';
import Companies from '../Companies';
import Residents from '../Residents';

import useStyles from './useStyles';

const TABS = {
  RESIDENT: {
    ID: 'RESIDENT',
    LABEL: 'tabs.users.allUsers',
    BUTTON: 'buttons.newUser',
  },
  APARTMENT: {
    ID: 'APARTMENT',
    LABEL: 'tabs.users.apartments',
    BUTTON: 'buttons.newApartment',
  },
  COMPANY: {
    ID: 'COMPANY',
    LABEL: 'tabs.users.companies',
    BUTTON: 'buttons.newCompany',
  },
};

const List = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(
    paginationConstants.DEFAULT_PAGE,
  );
  const [activeFilter, setActiveFilter] = useState<UserFilter>({
    type: TABS.RESIDENT.ID as UserType,
  });
  const [activeTab, setActiveTab] = useState<string | null>(TABS.RESIDENT.ID);
  const { getUsers, createUser } = user.actions();
  const { areResidentsLoading } = useRecoilValue(user.state.residentAtom);
  const { areCompaniesLoading } = useRecoilValue(user.state.companyAtom);
  const { areApartmentsLoading } = useRecoilValue(user.state.apartmentAtom);

  const handleSearch = useCallback((search: string) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setSearch(search);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setActiveTab(value);
    setActiveFilter((prev) => ({ ...prev, type: value as UserType }));
  }, []);

  const handleCreateUser = useCallback(
    (values: CreateUser) => {
      close();
      createUser(values);
    },
    [close, createUser],
  );

  useEffect(() => {
    getUsers(
      {
        page: currentPage,
        pageSize: paginationConstants.USERS.PAGE_SIZE,
      },
      { ...activeFilter, search },
    );
  }, [activeFilter, search, currentPage, getUsers]);

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.users.title')]} />
      }
    >
      <Title order={3} className={classes.title}>
        {t('page.users.title')}
      </Title>
      <Tabs
        className={classes.tabsContainer}
        value={activeTab}
        onTabChange={handleTabChange}
      >
        <Tabs.List>
          <Tabs.Tab icon={<UserIcon size={20} />} value={TABS.RESIDENT.ID}>
            {t(TABS.RESIDENT.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab
            icon={<ApartmentIcon size={20} />}
            value={TABS.APARTMENT.ID}
          >
            {t(TABS.APARTMENT.LABEL)}
          </Tabs.Tab>
          <Tabs.Tab icon={<CompanyIcon size={20} />} value={TABS.COMPANY.ID}>
            {t(TABS.COMPANY.LABEL)}
          </Tabs.Tab>
        </Tabs.List>
        <Flex className={classes.actionsContainer}>
          <Button
            className={classes.button}
            leftIcon={<ImportIcon size={18} />}
            variant="neutral"
          >
            {t('common.import')}
          </Button>
          <Button
            className={classes.button}
            rightIcon={<IconPlus size={18} />}
            onClick={open}
          >
            {t(
              ((TABS as KeyPair<any>)[activeTab as string] as KeyPair<string>)
                .BUTTON,
            )}
          </Button>
          <Input.Search classNames={classes.search} action={handleSearch} />
          <Button
            variant="filter"
            className={clsx(classes.button, 'filter')}
            leftIcon={<FilterIcon size={18} />}
            rightIcon={<ArrowDownIcon size={16} />}
          >
            {t('common.filter')}
          </Button>
        </Flex>
        <Tabs.Panel className={classes.tabContainer} value={TABS.RESIDENT.ID}>
          {areResidentsLoading ? (
            <Loaders.Overlay />
          ) : (
            <Residents
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
              newUserClick={open}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel className={classes.tabContainer} value={TABS.APARTMENT.ID}>
          {areApartmentsLoading ? (
            <Loaders.Overlay />
          ) : (
            <Apartments
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
              newUserClick={open}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel className={classes.tabContainer} value={TABS.COMPANY.ID}>
          {areCompaniesLoading ? (
            <Loaders.Overlay />
          ) : (
            <Companies
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
              newUserClick={open}
            />
          )}
        </Tabs.Panel>
      </Tabs>
      <Modal
        title={t('wizard.users.title')}
        size="lg"
        centered
        opened={opened}
        onClose={close}
        className={classes.userDialog}
      >
        <Wizard.NewUser
          handleClose={close}
          handleCreateUser={handleCreateUser}
        />
      </Modal>
    </Layouts.Page>
  );
};

export default memo(List);
