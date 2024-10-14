import React from 'react';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice } from '@/common/models';

import { Configuration, Credentials, General, Review } from './components';

export default () => [
  {
    index: 0,
    label: 'wizard.devices.general.title',
    Component: ({ ...wizardProps }: WizardComponentProps<CreateDevice>) => (
      <General wizardProps={wizardProps} />
    ),
  },
  {
    index: 1,
    label: 'wizard.devices.configuration.title',
    Component: ({ ...wizardProps }: WizardComponentProps<CreateDevice>) => (
      <Configuration wizardProps={wizardProps} />
    ),
  },
  {
    index: 2,
    label: 'wizard.devices.credentials.title',
    Component: ({ ...wizardProps }: WizardComponentProps<CreateDevice>) => (
      <Credentials wizardProps={wizardProps} />
    ),
  },
  {
    index: 3,
    label: 'wizard.devices.review.title',
    Component: ({ ...wizardProps }: WizardComponentProps<CreateDevice>) => (
      <Review wizardProps={wizardProps} />
    ),
  },
];
