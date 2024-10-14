import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('forms.login.validation.email'))
      .required(t('forms.login.validation.required.email')),
    password: Yup.string()
      .min(2, t('forms.login.validation.min.password', { min: 2 }))
      .max(30, t('forms.login.validation.max.password', { max: 30 }))
      .required(t('forms.login.validation.required.password')),
  });
