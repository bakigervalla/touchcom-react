import React, { memo } from 'react';

import { Layouts } from '@/components';

import { RequestForm } from './components';

const Request = () => (
  <Layouts.Auth>
    <RequestForm />
  </Layouts.Auth>
);

export default memo(Request);
