import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    firstName: Yup.string().required(
      t('forms.administrators.adminInvite.validation.required.firstName'),
    ),
    lastName: Yup.string().required(
      t('forms.administrators.adminInvite.validation.required.lastName'),
    ),
    email: Yup.string()
      .email(t('forms.login.validation.email'))
      .required(
        t('forms.administrators.adminInvite.validation.required.email'),
      ),
    roleId: Yup.string().required(
      t('forms.administrators.adminInvite.validation.required.role'),
    ),
  });
