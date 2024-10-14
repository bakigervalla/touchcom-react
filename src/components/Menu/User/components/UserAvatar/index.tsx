import { Avatar } from '@mantine/core';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';

import { auth } from '@/data';

import useStyles from './useStyles';

const UserAvatar = () => {
  const { classes } = useStyles();
  const { user } = useRecoilValue(auth.state.authAtom);

  return user?.imageUrl ? (
    <Avatar
      className={classes.avatar}
      alt="User profile icon"
      radius="xl"
      src={user?.imageUrl}
    />
  ) : (
    <Avatar
      className={classes.avatar}
      alt="User profile icon"
      radius="xl"
      color="green"
    >
      {user?.email[0].toUpperCase() ?? '-'}
    </Avatar>
  );
};

export default memo(UserAvatar);
