import styles from './RoomView.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '../User';
import axios from '../../core/axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { selectUser } from '../../redux/slices/userSlice';
import socket, { Socket } from 'socket.io-client';
import { updateSpeakersRoom } from '../../redux/slices/roomSlice';

interface RoomView {
  title: string | string[];
}

export const RoomView: React.FC<RoomView> = ({ title }) => {
  // const [users, setUsers] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const ioRef = useRef<Socket>();
  const dispatch = useDispatch<AppDispatch>();

  const userData = useSelector((state: RootState) => selectUser(state.userReducer));
  const [users, setUsers] = useState([]);
  if (typeof window !== undefined) {
    // console.log(room);
  }
  useEffect(() => {
    if (typeof window !== undefined) {
      ioRef.current = socket('http://localhost:3001');
      ioRef.current.emit('CLIENT:ROOMS/USER_JOIN', { roomId: id, userData });

      ioRef.current.on('SERVER:ROOMS/JOINED', async (users) => {
        setUsers(users);
        const { payload } = await dispatch(updateSpeakersRoom({ id, speakers: users }));
      });
      ioRef.current.on('SERVER:ROOMS/LEAVE', async (user) => {
        setUsers((prev) => prev.filter((obj) => obj.id !== user.id));
        const { payload } = await dispatch(
          updateSpeakersRoom({ id, speakers: users.filter((u) => u.id !== user.id) })
        );
      });

      // setUsers((prev) => {
      //   return [...prev, userData];
      // });
    }
    return () => {
      ioRef.current.disconnect();
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
