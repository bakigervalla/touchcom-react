import { Avatar, Button, Flex, Grid, Text, Title } from '@mantine/core';
import React, { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { AddNewCard, Status } from '@/components';
import { auth, site } from '@/data';
import { LocationIcon } from '@/icons';

import { placeholders } from '@/common/constants';
import { Site } from '@/common/models';
import { common } from '@/common/utils';

import useStyles from './useStyles';

interface EditSiteProps {
  onAdd: () => void;
  onLoadMore: () => void;
  onDetailsClick: (siteId: string) => void;
}

const CardView = ({ onAdd, onDetailsClick, onLoadMore }: EditSiteProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const observer = useRef<IntersectionObserver>();
  const { changeActiveSite } = auth.actions();
  const { user } = useRecoilValue(auth.state.authAtom);
  const { sites, areSitesLoading, pagination } = useRecoilValue(
    site.state.siteAtom,
  );

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (areSitesLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.page !== pagination.pageCount
        ) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [areSitesLoading, onLoadMore, pagination.page, pagination.pageCount],
  );

  return (
    <Grid className={classes.cardViewGrid} columns={16} gutter="md">
      <AddNewCard text={t('page.sites.newSiteButton')} onClick={onAdd} />
      {sites.map((site: Site, i: number) => (
        <Grid.Col
          key={site.id}
          span="content"
          ref={sites.length === i + 1 ? lastElementRef : null}
          className={classes.cardViewGridItem}
        >
          <Status status={site.status} classNames={classes.siteStatus} />
          <Avatar
            className={classes.image}
            src={
              site.imageUrl ||
              `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
            }
          />
          <Flex direction="column" gap={2}>
            <Title order={4} fw={700} align="center">
              {site.name}
            </Title>
            <Flex className={classes.locationContainer}>
              <LocationIcon size={15} className="icon" />
              <Text className="text">{common.getFormattedAddress(site)}</Text>
            </Flex>
          </Flex>
          <Flex className={classes.buttonsContainer}>
            <Button
              className="button"
              variant="neutral"
              onClick={() => onDetailsClick(String(site.id))}
            >
              {t('page.sites.siteDetailsButton')}
            </Button>
            <Button
              className="button"
              onClick={() => changeActiveSite(site.id)}
              disabled={!!(user?.activeSite && user.activeSite.id === site.id)}
            >
              {t('page.sites.siteSelectButton')}
            </Button>
          </Flex>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default memo(CardView);
