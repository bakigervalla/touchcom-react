import { Button, Flex, clsx } from '@mantine/core';
import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowRightIcon } from '@/icons';

import { WizardProps } from '@/common/interfaces';

import useStyles from './useStyles';

interface NavigationButtons<T> {
  wizardProps: WizardProps<T>;
  onPreviousClick: () => void;
  onNextClick: () => void;
  handleClose: () => void;
  handleSubmit?: (wizardState: T) => void;
  finalStepButtons?: ReactNode[];
}

const NavigationButtons = <T,>({
  onPreviousClick,
  onNextClick,
  handleClose,
  handleSubmit,
  finalStepButtons,
  ...wizardProps
}: NavigationButtons<T>) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const showNextButton = useMemo(
    () =>
      wizardProps.wizardProps.activeStepIndex <
        wizardProps.wizardProps.steps.length - 1 ||
      (wizardProps.wizardProps.activeStepIndex >=
        wizardProps.wizardProps.steps.length - 1 &&
        !finalStepButtons &&
        !handleSubmit),
    [wizardProps, finalStepButtons, handleSubmit],
  );

  return (
    <Flex className={classes.buttonsContainer}>
      <Button variant="neutral" onClick={handleClose}>
        {t('common.cancel')}
      </Button>
      {wizardProps.wizardProps.activeStepIndex > 0 && (
        <Button
          className={clsx(classes.button, 'previous')}
          disabled={wizardProps.wizardProps.activeStepIndex <= 0}
          {...(wizardProps.wizardProps.activeStepIndex > 0
            ? { onClick: onPreviousClick }
            : {})}
        >
          {t('wizard.previous')}
        </Button>
      )}
      {showNextButton && (
        <Button
          className={classes.button}
          rightIcon={<ArrowRightIcon size={20} />}
          disabled={
            wizardProps.wizardProps.activeStepIndex >=
            wizardProps.wizardProps.steps.length - 1
          }
          {...(wizardProps.wizardProps.activeStepIndex <
          wizardProps.wizardProps.steps.length - 1
            ? { onClick: onNextClick }
            : {})}
        >
          {t('wizard.next')}
        </Button>
      )}
      {handleSubmit && !showNextButton && (
        <Button
          className={classes.button}
          onClick={() => handleSubmit(wizardProps.wizardProps.wizardState)}
        >
          {t('wizard.submit')}
        </Button>
      )}
      {finalStepButtons &&
        wizardProps.wizardProps.activeStepIndex >=
          wizardProps.wizardProps.steps.length - 1 &&
        finalStepButtons.map((finalStepButton) => finalStepButton)}
    </Flex>
  );
};

NavigationButtons.defaultProps = {
  handleSubmit: undefined,
  finalStepButtons: undefined,
};

export default NavigationButtons;
