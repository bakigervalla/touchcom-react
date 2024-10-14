import { Button, Flex, Radio, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { country, site } from '@/data';

import ConfirmationDialog from '@/components/ConfirmationDialog';
import ImageUploader from '@/components/ImageUploader';
import InlineEdit from '@/components/InlineEdit';
import Loaders from '@/components/Loaders';

import { data, placeholders } from '@/common/constants';
import { Country, Site, SiteStatus } from '@/common/models';
import { status as statusUtils } from '@/common/utils';

import useStyles from './useStyles';

interface SiteDetailsProps {
  siteId: string;
  onClose: () => void;
}
const Details = ({ siteId, onClose }: SiteDetailsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { getCountries } = country.actions();
  const { getSite, saveSite, removeSite, changeImage } = site.actions();
  const { countries, areCountriesLoading } = useRecoilValue(
    country.state.countryAtom,
  );
  const { site: siteData, isSiteLoading } = useRecoilValue(site.state.siteAtom);

  const handleRemoveSite = useCallback(() => {
    toggle();
    onClose();
    removeSite(siteData as Site);
  }, [onClose, removeSite, siteData, toggle]);

  useEffect(() => {
    if (siteId) {
      getSite(siteId);
    }
  }, [getSite, siteId]);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  if (!siteData || areCountriesLoading || isSiteLoading) {
    return <Loaders.Overlay />;
  }

  return (
    <Flex gap={40}>
      <ImageUploader
        radius="sm"
        imageUrl={
          siteData.imageUrl ??
          `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
        }
        classNames={{ image: classes.siteImage }}
        action={(image) => changeImage(image, siteData?.id ?? 0)}
      />
      <Flex className={classes.siteInfoContainer}>
        <Flex>
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.name')}
          </Text>
          <InlineEdit.Input
            value={siteData.name}
            onSetValue={(value: string) => {
              saveSite({ ...siteData, name: value });
            }}
            classNames={{ text: classes.title }}
          />
        </Flex>
        <Flex>
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.description')}
          </Text>
          <InlineEdit.Input
            value={siteData.description}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              saveSite({ ...siteData, description: value });
            }}
          />
        </Flex>
        <Flex>
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.status')}
          </Text>
          <Flex className={classes.radioButtons}>
            {Object.values(SiteStatus).map((status: string) => (
              <Radio
                radioGroup="status"
                checked={status === siteData.status}
                key={status}
                value={status}
                label={t(statusUtils.getFormattedStatusName(status))}
                onChange={(value: ChangeEvent<HTMLInputElement>) => {
                  saveSite({
                    ...siteData,
                    status: value.target.value as SiteStatus,
                  });
                }}
              />
            ))}
          </Flex>
        </Flex>
        <Flex align="center">
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.floor')}
          </Text>
          <InlineEdit.Select
            data={data.FLOORS}
            selected={{
              label: siteData.floor.toString(),
              value: siteData.floor.toString(),
            }}
            onSetValue={(value: string) => {
              saveSite({
                ...siteData,
                floor: parseInt(value, 10),
              });
            }}
            classNames={{ text: classes.text }}
          />
        </Flex>
        <Flex align="center">
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.country')}
          </Text>
          <InlineEdit.Select
            data={countries.map((country: Country) => ({
              value: country.id.toString(),
              label: country.name,
            }))}
            selected={
              siteData.address.country
                ? {
                    label: siteData.address.country?.name,
                    value: String(siteData.address.country?.id),
                  }
                : undefined
            }
            onSetValue={(value: string) => {
              saveSite({
                ...siteData,
                address: {
                  ...siteData.address,
                  country:
                    countries.find((obj) => obj.id === parseInt(value, 10)) ??
                    undefined,
                },
              });
            }}
            classNames={{ text: classes.text }}
          />
        </Flex>
        <Flex>
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.postalCode')}
          </Text>
          <InlineEdit.Input
            type="number"
            value={siteData.address.postalCode}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              saveSite({
                ...siteData,
                address: { ...siteData.address, postalCode: value },
              });
            }}
          />
        </Flex>
        <Flex>
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.city')}
          </Text>
          <InlineEdit.Input
            value={siteData.address.city}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              saveSite({
                ...siteData,
                address: { ...siteData.address, city: value },
              });
            }}
          />
        </Flex>
        <Flex>
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.street')}
          </Text>
          <InlineEdit.Input
            value={siteData.address.street}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              saveSite({
                ...siteData,
                address: { ...siteData.address, street: value },
              });
            }}
          />
        </Flex>
        <Flex>
          <Text className={classes.subtitle}>
            {t('forms.site.data.label.number')}
          </Text>
          <InlineEdit.Input
            value={siteData.address.number}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              saveSite({
                ...siteData,
                address: { ...siteData.address, number: value },
              });
            }}
          />
        </Flex>
        <Flex className={classes.buttonSection}>
          <Button variant="neutral" onClick={toggle}>
            {t('dialogs.sites.delete.deleteButton')}
          </Button>
        </Flex>
      </Flex>
      <ConfirmationDialog
        isOpened={opened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t('dialogs.sites.delete.confirmationText')}
        title={t('dialogs.sites.delete.confirmationTitle')}
        negativeButtonClick={close}
        positiveButtonClick={handleRemoveSite}
      />
    </Flex>
  );
};

export default memo(Details);
