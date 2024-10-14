import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(t('forms.exception.validation.required.name')),
    startTime: Yup.number().when('applyWholeDay', (data, schema) => {
      if (!data[0]) {
        return schema.required(
          t('forms.timeSchedule.validation.required.timeFrom'),
        );
      }
      return schema;
    }),
    endTime: Yup.number().when('startTime', (data, schema) => {
      if (data[0]) {
        return schema.moreThan(
          Yup.ref('startTime'),
          t('forms.timeSchedule.validation.moreThan.timeTo'),
        );
      }
      return schema;
    }),
  });
