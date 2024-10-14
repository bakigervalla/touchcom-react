import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(t('forms.site.validation.required.name')),
    address: Yup.object().shape({
      city: Yup.string().required(t('forms.site.validation.required.city')),
      street: Yup.string().required(t('forms.site.validation.required.street')),
      number: Yup.number()
        .typeError(t('forms.validation.invalidValue'))
        .required(t('forms.site.validation.required.number')),
      postalCode: Yup.number()
        .typeError(t('forms.validation.invalidValue'))
        .required(t('forms.site.validation.required.postalCode')),
    }),
    floor: Yup.number()
      .typeError(t('forms.validation.invalidValue'))
      .required(t('forms.site.validation.required.floor')),
  });
