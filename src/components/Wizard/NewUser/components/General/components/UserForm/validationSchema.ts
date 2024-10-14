import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    floor: Yup.string().required(
      t('forms.user.data.validation.required.floor'),
    ),
    phone: Yup.string()
      .required(t('forms.user.data.validation.required.phone'))
      .min(2, t('forms.user.data.validation.min.phone', { min: 6 }))
      .max(30, t('forms.user.data.validation.max.phone', { max: 25 }))
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        t('forms.user.data.validation.matches.phone'),
      ),
    email: Yup.string()
      .email(t('forms.user.data.validation.email'))
      .required(t('forms.user.data.validation.required.email')),
  });
