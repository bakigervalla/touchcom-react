import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    oldPassword: Yup.string().required(
      t('forms.device.validation.required.currentPassword'),
    ),
    newPassword: Yup.string()
      .required(t('forms.device.validation.required.password'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        t('infoSection.passwordFormat'),
      ),
    confirmPassword: Yup.string()
      .required(t('forms.device.validation.required.confirmPassword'))
      .oneOf(
        [Yup.ref('newPassword')],
        t('forms.device.validation.match.confirmPassword'),
      ),
  });
