import { TFunction } from 'i18next';
import * as Yup from 'yup';

import { UserType } from '@/common/models';

export default (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().when('type', (type, schema) => {
      if (
        (type[0] as UserType) === UserType.APARTMENT ||
        (type[0] as UserType) === UserType.COMPANY
      ) {
        return schema.required(t('forms.user.data.validation.required.name'));
      }
      return schema;
    }),
    firstName: Yup.string().when('type', (type, schema) => {
      if ((type[0] as UserType) === UserType.RESIDENT) {
        return schema.required(
          t('forms.user.data.validation.required.firstName'),
        );
      }
      return schema;
    }),
    lastName: Yup.string().when('type', (type, schema) => {
      if ((type[0] as UserType) === UserType.RESIDENT) {
        return schema.required(
          t('forms.user.data.validation.required.lastName'),
        );
      }
      return schema;
    }),
    number: Yup.string().when('type', (type, schema) => {
      if ((type[0] as UserType) === UserType.APARTMENT) {
        return schema.required(t('forms.user.data.validation.required.number'));
      }
      return schema;
    }),
  });
