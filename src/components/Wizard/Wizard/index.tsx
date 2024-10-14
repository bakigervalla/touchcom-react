import React, { ReactNode } from 'react';

import { WizardProps as IWizardProps } from '@/common/interfaces';

import Wrapper from '../Wrapper';

interface WizardProps<T> {
  children: ReactNode;
  wizardProps: IWizardProps<T>;
  handleClose: () => void;
  handleSubmit?: (wizardState: T) => void;
  showNavigationButtons?: boolean;
  stepperClassNames?: string;
  wrapperClassNames?: string;
  childrenClassNames?: string;
  finalStepButtons?: ReactNode[];
}

const Wizard = <T,>({
  children,
  childrenClassNames,
  finalStepButtons,
  showNavigationButtons,
  stepperClassNames,
  wrapperClassNames,
  handleClose,
  handleSubmit,
  ...wizardProps
}: WizardProps<T>) => (
  <Wrapper<T>
    childrenClassNames={childrenClassNames}
    showNavigationButtons={showNavigationButtons}
    stepperClassNames={stepperClassNames}
    wrapperClassNames={wrapperClassNames}
    finalStepButtons={finalStepButtons}
    handleClose={handleClose}
    handleSubmit={handleSubmit}
    {...wizardProps}
  >
    {children}
  </Wrapper>
);

Wizard.defaultProps = {
  childrenClassNames: '',
  finalStepButtons: undefined,
  showNavigationButtons: false,
  stepperClassNames: '',
  wrapperClassNames: '',
  handleSubmit: undefined,
};

export default Wizard;
