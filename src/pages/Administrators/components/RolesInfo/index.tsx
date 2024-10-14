import { Flex, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ExternalSourceIcon } from '@/icons';

import { paths } from '@/common/constants';

import useStyles from './useStyles';

const RolesInfo = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.rolesInfoContainer}>
      <Title order={5}>
        {t('page.administrators.rolesInfo.superAdmin.title')}
      </Title>
      <Text variant="subtitle">
        <Trans i18nKey="page.administrators.rolesInfo.superAdmin.description">
          Users with <b>Super admin</b> role attached can perform every action
          in the Touchcom platform including listing and modifying the data.
          Super Admins also have access to all sites and data.
        </Trans>
      </Text>
      <Title order={5}>
        {t('page.administrators.rolesInfo.siteAdmin.title')}
      </Title>
      <Text variant="subtitle">
        <Trans i18nKey="page.administrators.rolesInfo.siteAdmin.description">
          <b>Site admin</b> role enable site administrators to manage their site
          which includes devices and users management at specific site. Site
          admin can decide how his site will be formed.
        </Trans>
      </Text>
      <Title order={5}>
        {t('page.administrators.rolesInfo.standardUser.title')}
      </Title>
      <Text variant="subtitle">
        <Trans i18nKey="page.administrators.rolesInfo.standardUser.description">
          <b>Standard User</b> role grants basic user permissions to open doors
          and login through mobile app. Users with this permission don&quote;t
          have access to Admin Web.
        </Trans>
      </Text>
      <Title order={5}>
        {t('page.administrators.rolesInfo.installer.title')}
      </Title>
      <Text variant="subtitle">
        <Trans i18nKey="page.administrators.rolesInfo.installer.description">
          Users with <b>Device Setup</b> role have possibility to access device
          through login and setup it for production use.
        </Trans>
      </Text>
      <Text variant="subtitle" className={classes.linkContainer}>
        {t('page.administrators.rolesInfo.linkText')}
        <Link to={paths.SETTINGS_ROLES} className={classes.link}>
          {t('page.roles.title')} {t('common.page')}
          <ExternalSourceIcon size={14} />
        </Link>
      </Text>
    </Flex>
  );
};

export default memo(RolesInfo);
