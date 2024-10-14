import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(
      t('forms.accessKey.data.validation.required.name'),
    ),
    number: Yup.string().required(
      t('forms.accessKey.data.validation.required.number'),
    ),
    tag: Yup.string().required(
      t('forms.accessKey.data.validation.required.tag'),
    ),
  });
