import { Avatar, Flex, Modal, Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { auth, site } from '@/data';
import { ArrowDownIcon, ConfigurationIcon, LocationAddIcon } from '@/icons';

import Create from '@/pages/Sites/Create';
import Details from '@/pages/Sites/Details';

import { paths, placeholders } from '@/common/constants';

import { ActiveSiteInfo, SiteSelection } from './components';
import useStyles from './useStyles';

const DIALOG_TYPE = { SITE_DETAILS: 'SITE_DETAILS', NEW_SITE: 'NEW_SITE' };

const Site = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, setIsOpened] = useState(false);
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const [dialogType, setDialogType] = useState(DIALOG_TYPE.NEW_SITE);
  const [siteId, setSiteId] = useState<string>('');
  const [siteTitle, setSiteTitle] = useState<string>(
    t('page.sites.newSiteTitle'),
  );
  const { getSites } = site.actions();
  const resetSitesState = useResetRecoilState(site.state.siteAtom);
  const { user } = useRecoilValue(auth.state.authAtom);
  const { areSitesLoading } = useRecoilValue(site.state.siteAtom);
  const sitesWithoutActiveSite = useRecoilValue(
    site.state.sitesWithoutActiveSite,
  );

  const handleAddSite = useCallback(() => {
    open();
    setIsOpened(false);
    setSiteTitle(t('page.sites.newSiteTitle'));
    setDialogType(DIALOG_TYPE.NEW_SITE);
  }, [open, t]);

  const handleDetailsClick = useCallback(
    (id: string) => {
      setDialogType(DIALOG_TYPE.SITE_DETAILS);
      setSiteTitle(t('page.sites.siteDetailsTitle'));
      setSiteId(id);
      open();
      setIsOpened(false);
    },
    [open, t],
  );

  useEffect(() => {
    getSites({ page: 1, pageSize: 3, orderBy: [{ updatedAt: 'desc' }] });

    return () => {
      resetSitesState();
    };
  }, [getSites, resetSitesState]);

  return (
    <Popover
      position="bottom-start"
      shadow="xs"
      opened={opened}
      onChange={setIsOpened}
    >
      <Popover.Target>
        <Flex
          className={classes.siteMenuContainer}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <Avatar
            className="image"
            src={
              user?.activeSite?.imageUrl ||
              `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
            }
          />
          <Text className="text">{user?.activeSite?.name}</Text>
          <ArrowDownIcon size={20} className="icon" />
        </Flex>
      </Popover.Target>
      <Popover.Dropdown className={classes.sitesOverviewContainer}>
        <ActiveSiteInfo />
        <Flex
          className={classes.itemContainer}
          onClick={() =>
            handleDetailsClick(user?.activeSite?.id.toString() as string)
          }
        >
          <ConfigurationIcon size={20} />
          <Text>{t('siteMenu.siteDetails.title')}</Text>
        </Flex>
        <Flex className={classes.itemContainer} onClick={handleAddSite}>
          <LocationAddIcon size={20} />
          <Text>{t('siteMenu.addSite.title')}</Text>
        </Flex>
        {!areSitesLoading && sitesWithoutActiveSite.length > 0 && (
          <SiteSelection />
        )}
        <Flex className="viewAllSection" onClick={() => navigate(paths.SITES)}>
          <Text className="text">{t('siteMenu.viewAll.title')}</Text>
        </Flex>
      </Popover.Dropdown>
      <Modal
        title={siteTitle}
        size="lg"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        {dialogType === DIALOG_TYPE.NEW_SITE ? (
          <Create onClose={close} />
        ) : (
          <Details onClose={close} siteId={siteId} />
        )}
      </Modal>
    </Popover>
  );
};

export default memo(Site);
