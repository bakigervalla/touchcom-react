import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    passwordResetToken: Yup.string().required(
      t(
        'forms.passwordRecovery.verification.validation.required.passwordResetToken',
      ),
    ),
    password: Yup.string()
      .min(
        2,
        t('forms.passwordRecovery.verification.validation.min.password', {
          min: 2,
        }),
      )
      .max(
        30,
        t('forms.passwordRecovery.verification.validation.max.password', {
          max: 30,
        }),
      )
      .required(
        t('forms.passwordRecovery.verification.validation.required.password'),
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        t('infoSection.passwordFormat'),
      ),
  });
