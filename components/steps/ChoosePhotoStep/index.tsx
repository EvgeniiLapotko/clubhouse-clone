import styles from './Photo.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MainContext } from '../../../pages';
import axios from '../../../core/axios';

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
  const { onNextStep, setUserData, userData } = useContext(MainContext);

  const handleChangeImage = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, avatar: imageUrl });
      const data = await uploadFile(file);
      console.log(data);
      setAvatar(data.url);
      setUserData({ ...userData, avatar: data.url });
      target.value = '';
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

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
          <Button onClick={onNextStep}>Next</Button>
        </div>
      </WhiteBlock>
    </>
  );
};
