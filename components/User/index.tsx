import React, { useState } from 'react';
import styles from './User.module.scss';
import Avatar from '@mui/material/Avatar';

interface User {
  user: any;
}

export const User: React.FC<User> = ({ user }) => {
  const [isVoice, setIsVoice] = useState(false);
  return (
    <div className={'mr-35 mb-20 d-flex flex-column aligh-items-center'} style={{ width: '100px' }}>
      <Avatar
        sx={{ width: 70, height: 70 }}
        src={user?.avatar}
        className={isVoice ? styles.isVoice : styles.noIsVoice}
      />
      <b className={'mt-5'}>{user?.fullName}</b>
    </div>
  );
};
