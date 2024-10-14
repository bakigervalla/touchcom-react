import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    accessControl: Yup.object().shape({
      accessKey: Yup.object().shape(
        {
          tag: Yup.string().when(
            ['number', 'name', 'pin'],
            (fields, schema) => {
              if (fields[0] || fields[1] || fields[2]) {
                return schema.required(
                  t('forms.user.data.validation.required.accessKey.id'),
                );
              }
              return schema;
            },
          ),
          number: Yup.string().when(['id', 'name', 'pin'], (fields, schema) => {
            if (fields[0] || fields[1] || fields[2]) {
              return schema.required(
                t('forms.user.data.validation.required.accessKey.number'),
              );
            }
            return schema;
          }),
          name: Yup.string().when(['id', 'number', 'pin'], (fields, schema) => {
            if (fields[0] || fields[1] || fields[2]) {
              return schema.required(
                t('forms.user.data.validation.required.accessKey.name'),
              );
            }
            return schema;
          }),
          pin: Yup.string().when(['id', 'number', 'name'], (fields, schema) => {
            if (fields[0] || fields[1] || fields[2]) {
              return schema.required(
                t('forms.user.data.validation.required.accessKey.pin'),
              );
            }
            return schema;
          }),
        },
        [
          ['number', 'name'],
          ['number', 'pin'],
          ['number', 'tag'],
          ['tag', 'pin'],
          ['tag', 'name'],
          ['pin', 'name'],
        ],
      ),
    }),
  });
