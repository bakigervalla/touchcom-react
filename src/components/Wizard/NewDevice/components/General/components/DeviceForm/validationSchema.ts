import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('forms.device.validation.required.name'))
      .min(5, t('forms.device.validation.min.name', { min: 5 }))
      .max(40, t('forms.device.validation.max.name', { max: 40 })),
    version: Yup.object().shape({
      id: Yup.string().required(t('forms.device.validation.required.version')),
    }),
    address: Yup.object().shape({
      street: Yup.string().required(
        t('forms.device.validation.required.street'),
      ),
      number: Yup.number()
        .typeError(t('forms.validation.invalidValue'))
        .required(t('forms.device.validation.required.number')),
    }),
    floor: Yup.number()
      .typeError(t('forms.validation.invalidValue'))
      .required(t('forms.device.validation.required.floor')),
  });
