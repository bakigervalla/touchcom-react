import { Stepper, clsx } from '@mantine/core';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Step as IStep } from '@/common/interfaces';

import useStyles from './useStyles';

interface CustomerStepperProps<T> {
  steps: IStep<T>[];
  activeStep: { index: number };
  onClick: (step: IStep<T>) => void;
  classNames?: string;
  isStepClickEnabled?: boolean;
}

const CustomStepper = <T,>({
  activeStep,
  classNames,
  isStepClickEnabled,
  onClick,
  steps,
}: CustomerStepperProps<T>) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const isStepActive = useCallback(
    (step: IStep<T>) => step.index === activeStep.index,
    [activeStep],
  );

  const onStepClick = useCallback(
    (stepIndex: number) => {
      const step: IStep<T> | undefined = steps.find(
        (step) => step.index === stepIndex,
      );

      if (
        step &&
        (step.index < activeStep.index ||
          (isStepClickEnabled && !isStepActive(step)))
      ) {
        onClick(step);
      }
    },
    [activeStep, steps, isStepActive, isStepClickEnabled, onClick],
  );

  return (
    <Stepper
      active={activeStep.index}
      className={clsx(classes.stepper, classNames)}
      onStepClick={onStepClick}
    >
      {steps.map((step) => (
        <Stepper.Step
          key={step.index}
          {...(step.index === activeStep.index ? { label: t(step.label) } : {})}
          {...('isCompleted' in step && step.isCompleted
            ? { completed: step.isCompleted({} as T) }
            : {})}
        />
      ))}
    </Stepper>
  );
};

CustomStepper.defaultProps = {
  classNames: '',
  isStepClickEnabled: false,
};

export default CustomStepper;
