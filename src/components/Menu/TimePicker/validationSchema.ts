import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    timeFrom: Yup.number().required(
      t('forms.timeSchedule.validation.required.timeFrom'),
    ),
    timeTo: Yup.number()
      .moreThan(
        Yup.ref('timeFrom'),
        t('forms.timeSchedule.validation.moreThan.timeTo'),
      )
      .required(t('forms.timeSchedule.validation.required.timeTo')),
  });
