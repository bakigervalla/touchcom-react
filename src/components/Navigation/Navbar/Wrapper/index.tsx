import { Avatar, Box, Chip, clsx } from '@mantine/core';
import React, { ReactNode, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@/icons';

import NavbarActions from '../Actions';
import NavbarTitle from '../Title';

import useStyles from './useStyles';

interface WrapperProps {
  actions?: [];
  actionsContainerClassNames?: string;
  info?: string;
  labels: string[];
  showBackButton?: boolean;
  showBackground?: boolean;
  status?: ReactNode;
  subtitle?: ReactNode;
  titleDecoration?: string;
  wrapperClassNames?: string;
}

const Wrapper = ({
  actions,
  actionsContainerClassNames,
  info,
  labels,
  showBackButton,
  showBackground,
  status,
  subtitle,
  titleDecoration,
  wrapperClassNames,
}: WrapperProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Box
      className={clsx(
        classes.navbarWrapperContainer,
        wrapperClassNames,
        showBackground && 'showBackground',
      )}
    >
      {showBackButton && (
        <Avatar className="icon" radius="xl" onClick={() => navigate(-1)}>
          <ArrowLeftIcon size={20} />
        </Avatar>
      )}
      <NavbarTitle
        labels={labels}
        titleDecoration={titleDecoration}
        subtitle={subtitle}
      />
      <Box
        className={clsx(
          classes.navbarWrapperActionsContainer,
          actionsContainerClassNames,
        )}
      >
        {(status || info) && (
          <Box display="flex">
            {status && status}
            {info && (
              <Chip className={classes.chip} size="small" value={info}>
                {info}
              </Chip>
            )}
          </Box>
        )}
        {actions && <NavbarActions actions={actions} />}
      </Box>
    </Box>
  );
};

Wrapper.defaultProps = {
  actions: undefined,
  actionsContainerClassNames: undefined,
  info: undefined,
  showBackButton: false,
  showBackground: false,
  status: undefined,
  subtitle: undefined,
  titleDecoration: '',
  wrapperClassNames: undefined,
};

export default memo(Wrapper);
