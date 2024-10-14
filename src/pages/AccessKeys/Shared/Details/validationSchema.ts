import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(t('forms.exception.validation.required.name')),
    validTo: Yup.number().when('validFrom', (data, schema) => {
      if (data[0] > Yup.ref('validTo')) {
        return schema.required(
          t('forms.timeSchedule.validation.moreThan.timeTo'),
        );
      }
      return schema;
    }),
  });
