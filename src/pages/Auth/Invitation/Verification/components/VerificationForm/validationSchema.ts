import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    invitationToken: Yup.string().required(
      t('forms.invitation.verification.validation.required.invitationToken'),
    ),
    password: Yup.string()
      .min(
        2,
        t('forms.invitation.verification.validation.min.password', { min: 2 }),
      )
      .max(
        30,
        t('forms.invitation.verification.validation.max.password', { max: 30 }),
      )
      .required(t('forms.invitation.verification.validation.required.password'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        t('infoSection.passwordFormat'),
      ),
  });
