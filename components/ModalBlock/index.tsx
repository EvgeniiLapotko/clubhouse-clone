import React, { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import styles from './ModalBlock.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';
import CelebrationIcon from '@mui/icons-material/Celebration';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { createRoom } from '../../redux/slices/roomSlice';
import { AppDispatch } from '../../redux/store';
interface ModalBlockProps {
  onClose: () => void;
}

export const ModalBlock: React.FC<ModalBlockProps> = ({ onClose }) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [roomType, setRoomType] = useState<string>('open');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async () => {
    if (!value.length) {
      setError(true);
      return;
    }
    const { payload } = await dispatch(createRoom({ title: value, type: roomType }));
    onClose();
    await router.push(`rooms/${payload.id}`);
  };
  return (
    <div className={styles.wrapper}>
      <IconButton onClick={onClose} className={styles.closeButton}>
        <CloseIcon />
      </IconButton>
      <div className={'mb-15'}>
        <div className={styles.title}>Topic</div>
        <TextField
          type='text'
          value={value}
          onChange={(e) => {
            setError(false);
            setValue(e.target.value);
          }}
          className={styles.input}
          placeholder={"Enter Room's name"}
          error={error}
          helperText={error ? 'Required' : ''}
        />
      </div>
      <h3>Room type</h3>
      <div className={'d-flex justify-content-center mb-30'}>
        <div
          onClick={() => setRoomType('open')}
          className={clsx(styles.roomType, { [styles.roomTypeActive]: roomType === 'open' })}
        >
          <PublicIcon />
          <span>open</span>
        </div>
        <div
          onClick={() => setRoomType('social')}
          className={clsx(styles.roomType, { [styles.roomTypeActive]: roomType === 'social' })}
        >
          <PeopleIcon />
          <span>social</span>
        </div>
        <div
          onClick={() => setRoomType('closed')}
          className={clsx(styles.roomType, { [styles.roomTypeActive]: roomType === 'closed' })}
        >
          <LockIcon />
          <span>closed</span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          startIcon={<CelebrationIcon />}
          variant={'contained'}
          className={styles.startButton}
          onClick={onSubmit}
        >
          Let's go
        </Button>
      </div>
    </div>
  );
};
