import { Flex, Text, clsx } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckIcon } from '@/icons';

import {
  language as languageConstants,
  placeholders,
} from '@/common/constants';

import useStyles from './useStyles';

const Menu = () => {
  const { classes } = useStyles();
  const { i18n, t } = useTranslation();

  return (
    <Flex direction="column">
      <Flex className={classes.titleContainer}>
        <Text fw={600}>
          {t('userMenu.changeLanguage.selectLanguageMenu.title')}
        </Text>
      </Flex>
      {Object.keys(languageConstants.SUPPORTED_LANGUAGES).map((language) => (
        <Flex
          key={language}
          className={clsx(
            classes.itemContainer,
            i18n.resolvedLanguage === language && 'active',
          )}
          onClick={() => void i18n.changeLanguage(language)}
        >
          <img
            className="languageIcon"
            src={`${placeholders.FLAGS_URL}/${languageConstants.LANGUAGE_TO_FLAG_MAP[language]}.png`}
            alt="xl"
          />
          <Text>
            {languageConstants.SUPPORTED_LANGUAGES[language].nativeName}
          </Text>
          {i18n.resolvedLanguage === language && (
            <CheckIcon size={20} className="icon" />
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default memo(Menu);
