import { Flex, Modal, Popover, Text, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { auth } from '@/data';
import { ArrowDownIcon, SettingsIcon, SignOutIcon } from '@/icons';

import Language from '@/components/Language';

import { placeholders } from '@/common/constants';
import { common, language } from '@/common/utils';

import { UserAvatar, UserProfile } from './components';
import useStyles from './useStyles';

const User = () => {
  const { classes } = useStyles();
  const { logout } = auth.actions();
  const { i18n, t } = useTranslation();
  const [isDialogOpened, { open, close }] = useDisclosure(false);
  const { user } = useRecoilValue(auth.state.authAtom);
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const [isLanguageMenuOpened, setIsLanguageMenuOpened] = useState(false);

  return (
    <Popover
      opened={isUserMenuOpened}
      shadow="xs"
      position="bottom-end"
      onChange={(opened) => {
        setIsUserMenuOpened(opened);
        setIsLanguageMenuOpened(opened);
      }}
    >
      <Popover.Target>
        <Flex
          className={classes.avatarContainer}
          onClick={() => setIsUserMenuOpened((prev) => !prev)}
        >
          <UserAvatar />
          <ArrowDownIcon size={20} cursor="pointer" />
        </Flex>
      </Popover.Target>
      <Popover.Dropdown className={classes.userMenuDropdownContainer}>
        <Flex className={classes.userInfoContainer}>
          <UserAvatar />
          <Flex direction="column">
            <Text className="userFullName">{common.getUserFullName(user)}</Text>
            <Text className="userRole">{user?.role.name}</Text>
          </Flex>
        </Flex>
        <Flex
          className={classes.itemContainer}
          onClick={() => {
            open();
            setIsUserMenuOpened(false);
          }}
        >
          <SettingsIcon size={20} />
          <Text>{t('userMenu.profileSettings.title')}</Text>
        </Flex>
        <Popover
          position="left"
          shadow="xs"
          opened={isLanguageMenuOpened}
          onChange={setIsLanguageMenuOpened}
        >
          <Popover.Target>
            <Flex
              className={clsx(
                classes.itemContainer,
                isLanguageMenuOpened && 'active',
              )}
              onClick={() => setIsLanguageMenuOpened((prev) => !prev)}
            >
              <img
                className="languageIcon"
                src={`${placeholders.FLAGS_URL}/${language.getFlagByLanguage(
                  i18n.resolvedLanguage || '',
                )}.png`}
                alt="xl"
              />
              <Text>{t('userMenu.changeLanguage.title')}</Text>
            </Flex>
          </Popover.Target>
          <Popover.Dropdown className={classes.languageMenuContainer}>
            <Language.Menu />
          </Popover.Dropdown>
        </Popover>
        <Flex className={classes.itemContainer} onClick={logout}>
          <SignOutIcon size={20} />
          <Text>{t('userMenu.signOut.title')}</Text>
        </Flex>
      </Popover.Dropdown>
      <Modal
        title={t('userMenu.profileSettings.title')}
        size="lg"
        centered
        opened={isDialogOpened}
        onClose={close}
      >
        <UserProfile onClose={close} />
      </Modal>
    </Popover>
  );
};

export default memo(User);
