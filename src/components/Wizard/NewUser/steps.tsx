import React from 'react';

import { Step, WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

import {
  AccessControl,
  Credentials,
  General,
  Review,
  Type,
} from './components';

export default () =>
  [
    {
      index: 0,
      label: 'wizard.users.general.title',
      Component: ({ ...wizardProps }: WizardComponentProps<CreateUser>) => (
        <General wizardProps={wizardProps} />
      ),
    },
    {
      index: 1,
      label: 'wizard.users.type.title',
      Component: ({ ...wizardProps }: WizardComponentProps<CreateUser>) => (
        <Type wizardProps={wizardProps} />
      ),
    },
    {
      index: 2,
      label: 'wizard.users.accessControl.title',
      Component: ({ ...wizardProps }: WizardComponentProps<CreateUser>) => (
        <AccessControl wizardProps={wizardProps} />
      ),
    },
    {
      index: 3,
      label: 'wizard.users.credentials.title',
      Component: ({ ...wizardProps }: WizardComponentProps<CreateUser>) => (
        <Credentials wizardProps={wizardProps} />
      ),
    },
    {
      index: 4,
      label: 'wizard.users.review.stepTitle',
      Component: ({ ...wizardProps }: WizardComponentProps<CreateUser>) => (
        <Review wizardProps={wizardProps} />
      ),
    },
  ] as Step<CreateUser>[];
