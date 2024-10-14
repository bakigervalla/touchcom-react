import { Flex } from '@mantine/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Forms from '@/components/Forms';
import PopoverSearch from '@/components/PopoverSearch';

import { CreateUser, SearchResult } from '@/common/models';

import useStyles from './useStyles';

interface CompanyFormProps {
  searchResults: SearchResult[];
  errors: FormikErrors<CreateUser>;
  touched: FormikTouched<CreateUser>;
  handleSearch: (search: string) => void;
  handleSearchResultClick: (item: SearchResult) => void;
}

const CompanyForm = ({
  errors,
  touched,
  handleSearch,
  searchResults,
  handleSearchResultClick,
}: CompanyFormProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.companyFormContainer}>
      <Flex gap={8} align="flex-end">
        <Forms.TextField
          w="50%"
          inputLabel={t('forms.user.data.label.name')}
          placeholder={t('forms.user.data.placeholder.name')}
          id="name"
          name="name"
          maxLength={40}
          error={touched.name && errors.name}
        />
        <PopoverSearch
          action={handleSearch}
          searchResults={searchResults}
          handleSearchResultClick={handleSearchResultClick}
          placeholder="common.attachDevice"
          classNames={classes.deviceSearch}
        />
      </Flex>
    </Flex>
  );
};

export default memo(CompanyForm);
