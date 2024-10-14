import React, { memo } from 'react';

import { Layouts } from '@/components';

import { VerificationForm } from './components';

const Verification = () => (
  <Layouts.Auth>
    <VerificationForm />
  </Layouts.Auth>
);

export default memo(Verification);
