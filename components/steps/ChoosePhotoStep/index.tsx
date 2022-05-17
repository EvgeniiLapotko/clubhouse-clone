import styles from './Photo.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MainContext } from '../../../pages';
import axios from '../../../core/axios';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const { data } = await axios.post('upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const ChoosePhotoStep: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>('');
  const { setUserData, userData } = useContext(MainContext);
  const router = useRouter();

  const handleChangeImage = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, avatar: imageUrl });
      const fileData = await uploadFile(file);
      setAvatar(fileData.url);
      setUserData({ ...userData, avatar: fileData.url });
      target.value = '';
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  const onSubmit = async () => {
    const { data } = await axios.post('/auth/activated', userData);
    jsCookie.set('token', data.token);
    await router.push('rooms');
  };

  return (
    <>
      <StepInfo
        title={`Select your Avatar, ${userData?.fullName}`}
        description='Give people see to you'
        icon={<AccountCircleIcon />}
      />
      <WhiteBlock className={styles.block}>
        <div className={styles.photoBlock}>
          <Avatar sx={{ width: 90, height: 90 }} src={avatar} />
        </div>
        <div className={'mb-30'}>
          <label htmlFor='image' style={{ color: '#0af', cursor: 'pointer' }}>
            Choose a different photo
          </label>
        </div>
        <input id='image' ref={inputRef} hidden type='file' />
        <div>
          <Button onClick={onSubmit}>Next</Button>
        </div>
      </WhiteBlock>
    </>
  );
};
