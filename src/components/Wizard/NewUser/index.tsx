import React, { memo, useMemo } from 'react';

import { useWizard } from '@/hooks';

import Wizard from '@/components/Wizard/Wizard';

import {
  AccessKey,
  AccessKeyStatus,
  AccessKeyType,
  Address,
  CreateUser,
  UserAccessControl,
  UserType,
} from '@/common/models';

import steps from './steps';

interface NewUserProps {
  handleClose: () => void;
  handleCreateUser: (wizardState: CreateUser) => void;
}

const NewUser = ({ handleClose, handleCreateUser }: NewUserProps) => {
  const wizardProps = useWizard(useMemo(steps, []), false, {
    firstName: '',
    lastName: '',
    phone: '',
    address: { number: '55', city: 'city', postalCode: '556' } as Address,
    email: '',
    type: UserType.RESIDENT,
    name: '',
    number: '',
    floor: 0,
    password: '',
    confirmPassword: '',
    accessControl: {
      accessKey: {
        name: '',
        type: AccessKeyType.TAG,
        status: AccessKeyStatus.ACTIVE,
        validFrom: new Date(),
        validTo: new Date(),
        pin: '',
      } as Omit<AccessKey, 'id' | 'tag' | 'accessControl'>,
    } as UserAccessControl,
  });

  return (
    <Wizard<CreateUser>
      wizardProps={wizardProps}
      showNavigationButtons
      handleClose={handleClose}
      handleSubmit={handleCreateUser}
    >
      {wizardProps.Component(wizardProps)}
    </Wizard>
  );
};

export default memo(NewUser);
