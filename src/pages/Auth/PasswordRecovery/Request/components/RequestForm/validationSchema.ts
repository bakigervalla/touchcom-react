import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('forms.passwordRecovery.request.validation.email'))
      .required(t('forms.passwordRecovery.request.validation.required.email')),
  });
