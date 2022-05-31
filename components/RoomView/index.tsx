import styles from './RoomView.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '../User';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectUser } from '../../redux/slices/userSlice';
import { useSocket } from '../../hook/useSocket';

interface RoomView {
  title: string | string[];
}

export const RoomView: React.FC<RoomView> = ({ title }) => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const ioRef = useSocket();

  const userData = useSelector((state: RootState) => selectUser(state.userReducer));
  const [users, setUsers] = useState([]);
  if (typeof window !== undefined) {
    // console.log(room);
  }
  useEffect(() => {
    if (typeof window !== undefined) {
      ioRef.emit('CLIENT:ROOMS/USER_JOIN', { roomId: id, userData });

      ioRef.on('SERVER:ROOMS/JOINED', async (users) => {
        setUsers(users);
      });
      ioRef.on('SERVER:ROOMS/LEAVE', async (user) => {
        setUsers((prev) => prev.filter((obj) => obj.id !== user.id));
      });
    }
    return () => {
      ioRef.disconnect();
    };
  }, []);

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
