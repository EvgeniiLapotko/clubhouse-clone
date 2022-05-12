import styles from './RoomView.module.scss';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '../User';
import axios from '../../core/axios';
import { useRouter } from 'next/router';

interface RoomView {
  title: string | string[];
}

export const RoomView: React.FC<RoomView> = ({ title }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  return (
    <div className={styles.block}>
      <div className={'d-flex aligh-items-center justify-content-between '}>
        <h2>{title}</h2>
        <div className={styles.actionButtons}>
          <Link href='/rooms'>
            <Button variant={'outlined'} color={'error'} endIcon={<LogoutIcon />}>
              Leave quietly
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.users}>
        {users.map((user, i) => {
          return <User user={user} key={i} />;
        })}
      </div>
    </div>
  );
};
