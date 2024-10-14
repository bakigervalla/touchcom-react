/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Flex, Text, clsx } from '@mantine/core';
import React, { ReactNode, useCallback } from 'react';

import { WizardProps } from '@/common/interfaces';
import { common } from '@/common/utils';

import CustomStepper from '../CustomStepper';
import NavigationButtons from '../NavigationButtons';

import useStyles from './useStyles';

const NAVIGATION_BUTTON_TYPE = { PREVIOUS: 'PREVIOUS', NEXT: 'NEXT' };

interface WrapperProps<T> {
  children: ReactNode;
  wizardProps: WizardProps<T>;
  handleClose: () => void;
  handleSubmit?: (wizardState: T) => void;
  showNavigationButtons?: boolean;
  stepperClassNames?: string;
  wrapperClassNames?: string;
  childrenClassNames?: string;
  finalStepButtons?: ReactNode[];
}

const Wrapper = <T,>({
  children,
  childrenClassNames,
  finalStepButtons,
  showNavigationButtons,
  stepperClassNames,
  wrapperClassNames,
  handleClose,
  handleSubmit,
  ...wizardProps
}: WrapperProps<T>) => {
  const { classes } = useStyles();

  const handleStepSubmit = useCallback(async (): Promise<boolean> => {
    const { stepRef } = wizardProps.wizardProps;
    if (stepRef && stepRef.current) {
      stepRef.current.handleSubmit();
      await common.sleep(500);
      return stepRef.current.isValid;
    }

    return true;
  }, [wizardProps]);

  const handleNavigationButtonClick = useCallback(
    async (type: string) => {
      const isSuccessful = await handleStepSubmit();

      if (!isSuccessful) {
        return;
      }

      switch (type) {
        case NAVIGATION_BUTTON_TYPE.PREVIOUS:
          wizardProps.wizardProps.prevStep();
          break;
        case NAVIGATION_BUTTON_TYPE.NEXT:
          wizardProps.wizardProps.nextStep();
          break;
        default:
          wizardProps.wizardProps.nextStep();
          break;
      }
    },
    [wizardProps, handleStepSubmit],
  );

  return (
    <Flex className={clsx(classes.wizardWrapperContainer, wrapperClassNames)}>
      {wizardProps.wizardProps.activeStep.title && (
        <Flex className={classes.stepTitleContainer}>
          <Text className={classes.stepTitle}>
            {wizardProps.wizardProps.activeStep.title}
          </Text>
        </Flex>
      )}
      {wizardProps.wizardProps.activeStep.description && (
        <Text>{wizardProps.wizardProps.activeStep.description}</Text>
      )}
      <CustomStepper<T>
        activeStep={wizardProps.wizardProps.activeStep}
        steps={wizardProps.wizardProps.steps}
        isStepClickEnabled={wizardProps.wizardProps.isStepClickEnabled}
        onClick={wizardProps.wizardProps.setActiveStep}
        classNames={stepperClassNames}
      />
      <Flex className={clsx(classes.childrenContainer, childrenClassNames)}>
        {children}
        {showNavigationButtons && (
          <NavigationButtons<T>
            onPreviousClick={() =>
              void handleNavigationButtonClick(NAVIGATION_BUTTON_TYPE.PREVIOUS)
            }
            onNextClick={() =>
              void handleNavigationButtonClick(NAVIGATION_BUTTON_TYPE.NEXT)
            }
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            finalStepButtons={finalStepButtons}
            {...wizardProps}
          />
        )}
      </Flex>
    </Flex>
  );
};

Wrapper.defaultProps = {
  childrenClassNames: '',
  finalStepButtons: undefined,
  showNavigationButtons: false,
  handleSubmit: undefined,
  stepperClassNames: '',
  wrapperClassNames: '',
};

export default Wrapper;
