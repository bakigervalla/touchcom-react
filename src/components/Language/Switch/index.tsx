import { Flex, Popover, Text, clsx } from '@mantine/core';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowDownIcon } from '@/icons';

import { language, placeholders } from '@/common/constants';

import LanguageMenu from '../Menu';

import useStyles from './useStyles';

interface SwitchProps {
  classNames?: string;
}

const Switch = ({ classNames }: SwitchProps) => {
  const { classes } = useStyles();
  const { i18n } = useTranslation();
  const [opened, setIsOpened] = useState(false);

  return (
    <Popover
      position="bottom-end"
      shadow="xs"
      opened={opened}
      onChange={setIsOpened}
    >
      <Popover.Target>
        <Flex
          className={clsx(classes.switchContainer, classNames)}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <img
            className="languageIcon"
            src={`${placeholders.FLAGS_URL}/${
              language.LANGUAGE_TO_FLAG_MAP[i18n.resolvedLanguage || 'no']
            }.png`}
            alt="xl"
          />
          <Text>
            {
              language.SUPPORTED_LANGUAGES[i18n.resolvedLanguage || 'no']
                .displayName
            }
          </Text>
          <ArrowDownIcon size={12} />
        </Flex>
      </Popover.Target>
      <Popover.Dropdown className={classes.languageMenuContainer}>
        <LanguageMenu />
      </Popover.Dropdown>
    </Popover>
  );
};

Switch.defaultProps = {
  classNames: '',
};

export default memo(Switch);
