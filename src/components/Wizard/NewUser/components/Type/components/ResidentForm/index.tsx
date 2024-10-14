import { Flex } from '@mantine/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Forms from '@/components/Forms';
import PopoverSearch from '@/components/PopoverSearch';

import { CreateUser, SearchResult } from '@/common/models';

import useStyles from './useStyles';

interface ResidentFormProps {
  searchResults: SearchResult[];
  errors: FormikErrors<CreateUser>;
  touched: FormikTouched<CreateUser>;
  handleSearch: (search: string) => void;
  handleSearchResultClick: (item: SearchResult) => void;
}

const ResidentForm = ({
  errors,
  touched,
  handleSearch,
  searchResults,
  handleSearchResultClick,
}: ResidentFormProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.residentFormContainer}>
      <PopoverSearch
        action={handleSearch}
        searchResults={searchResults}
        handleSearchResultClick={handleSearchResultClick}
        placeholder="common.attachDevice"
        classNames={classes.deviceSearch}
      />
      <Flex gap={8}>
        <Forms.TextField
          w="50%"
          inputLabel={t('forms.user.data.label.firstName')}
          placeholder={t('forms.user.data.placeholder.firstName')}
          id="firstName"
          name="firstName"
          maxLength={40}
          error={touched.firstName && errors.firstName}
        />
        <Forms.TextField
          w="50%"
          inputLabel={t('forms.user.data.label.lastName')}
          placeholder={t('forms.user.data.placeholder.lastName')}
          id="lastName"
          name="lastName"
          maxLength={40}
          error={touched.lastName && errors.lastName}
        />
      </Flex>
    </Flex>
  );
};

export default memo(ResidentForm);
