import { Button, Flex, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { Layouts, Loaders } from '@/components';
import { site } from '@/data';

import EventFilter from '@/components/EventFilter';

import { pagination as paginationConstants } from '@/common/constants';
import { EventFilterItem, SiteFilter } from '@/common/interfaces';
import { SiteStatus } from '@/common/models';

import Create from '../Create';
import Details from '../Details';

import { CardView } from './components';
import useStyles from './useStyles';

const DIALOG_TYPE = { SITE_DETAILS: 'SITE_DETAILS', NEW_SITE: 'NEW_SITE' };

const List = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [dialogType, setDialogType] = useState(DIALOG_TYPE.NEW_SITE);
  const [siteId, setSiteId] = useState<string>('');
  const [siteTitle, setSiteTitle] = useState<string>(
    t('page.sites.newSiteTitle'),
  );
  const [currentPage, setCurrentPage] = useState(
    paginationConstants.DEFAULT_PAGE,
  );
  const [activeFilter, setActiveFilter] = useState<SiteFilter | undefined>(
    undefined,
  );
  const { getSites, getSitesOverview } = site.actions();
  const { sitesOverview, areSitesLoading } = useRecoilValue(
    site.state.siteAtom,
  );

  const SITE_STATUS_FILTERS = useMemo(
    () => [
      {
        id: 1,
        key: 'ALL',
        label: t('page.sites.filters.allSites'),
        value: sitesOverview?.totalSites ?? 0,
      },
      {
        id: 2,
        key: SiteStatus.ACTIVE,
        label: t('page.sites.filters.active'),
        value: sitesOverview?.activeSites ?? 0,
      },
      {
        id: 3,
        key: SiteStatus.INACTIVE,
        label: t('page.sites.filters.inactive'),
        value: sitesOverview?.inactiveSites ?? 0,
      },
    ],
    [t, sitesOverview],
  );

  const handleAddSite = useCallback(() => {
    open();
    setSiteTitle(t('page.sites.newSiteTitle'));
    setDialogType(DIALOG_TYPE.NEW_SITE);
  }, [open, t]);

  const handleFilter = useCallback((filter: EventFilterItem) => {
    setCurrentPage(paginationConstants.DEFAULT_PAGE);
    setActiveFilter(
      filter.key !== 'ALL' ? { status: filter.key as SiteStatus } : undefined,
    );
  }, []);

  const handleDetailsClick = useCallback(
    (id: string) => {
      setDialogType(DIALOG_TYPE.SITE_DETAILS);
      setSiteTitle(t('page.sites.siteDetailsTitle'));
      setSiteId(id);
      open();
    },
    [open, t],
  );

  useEffect(() => {
    getSites(
      {
        page: currentPage,
        pageSize: paginationConstants.SITES.PAGE_SIZE,
      },
      { ...activeFilter },
    );
  }, [activeFilter, currentPage, getSites]);

  useEffect(() => {
    getSitesOverview();
  }, [getSitesOverview]);

  return (
    <Layouts.Property>
      <Modal
        title={siteTitle}
        size="auto"
        centered
        opened={opened}
        onClose={close}
      >
        {dialogType === DIALOG_TYPE.NEW_SITE ? (
          <Create onClose={close} />
        ) : (
          <Details onClose={close} siteId={siteId} />
        )}
      </Modal>
      <Flex className={classes.headerContainer}>
        <Title order={1}>{t('page.sites.title')}</Title>
        <Title order={5}>{t('page.sites.subtitle')}</Title>
      </Flex>
      <Flex className={classes.configurationContainer}>
        <EventFilter items={SITE_STATUS_FILTERS} onClick={handleFilter} />
        <Button
          name="Add"
          rightIcon={<IconPlus size={16} />}
          onClick={handleAddSite}
          className="button"
          variant="action"
        >
          {t('page.sites.newSiteButton')}
        </Button>
      </Flex>
      {areSitesLoading ? (
        <Flex className={classes.loaderContainer}>
          <Loaders.Overlay />
        </Flex>
      ) : (
        <CardView
          onAdd={handleAddSite}
          onDetailsClick={handleDetailsClick}
          onLoadMore={() => setCurrentPage(currentPage + 1)}
        />
      )}
    </Layouts.Property>
  );
};

export default memo(List);
