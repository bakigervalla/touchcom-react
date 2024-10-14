import { TFunction } from 'i18next';
import * as Yup from 'yup';

export default (t: TFunction) =>
  Yup.object().shape({
    configuration: Yup.object().shape({
      lockStatus: Yup.string().required(
        t('forms.device.validation.required.lockStatus'),
      ),
      screenSize: Yup.string().required(
        t('forms.device.validation.required.screenSize'),
      ),
      rotation: Yup.string().required(
        t('forms.device.validation.required.deviceRotation'),
      ),
      cameraRotation: Yup.string().required(
        t('forms.device.validation.required.cameraRotation'),
      ),
      heartbeatInterval: Yup.number().required(
        t('forms.device.validation.required.heartbeatInterval'),
      ),
      mainScreenDelay: Yup.number().required(
        t('forms.device.validation.required.mainScreenDelay'),
      ),
      waitBranchLevel: Yup.number().required(
        t('forms.device.validation.required.waitBranchLevel'),
      ),
      activeBranchLevel: Yup.number().required(
        t('forms.device.validation.required.activeBranchLevel'),
      ),
    }),
  });
