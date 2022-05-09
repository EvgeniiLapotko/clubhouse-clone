import styles from './Photo.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MainContext } from '../../../pages';

export const ChoosePhotoStep: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>('');
  const { onNextStep } = useContext(MainContext);

  const handleChangeImage = (e: Event): void => {
    const file = (e.target as HTMLInputElement).files[0];
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <>
      <StepInfo
        title='Select your Avatar'
        description='Give people see to you'
        icon={<AccountCircleIcon />}
      />
      <WhiteBlock className={styles.block}>
        <div className={styles.photoBlock}>
          <Avatar sx={{ width: 90, height: 90 }} src={avatar} />
        </div>
        <div className={'mb-30'}>
          <label htmlFor='image'>Choose a different photo</label>
        </div>
        <input id='image' ref={inputRef} hidden type='file' />
        <div>
          <Button onClick={onNextStep}>Next</Button>
        </div>
      </WhiteBlock>
    </>
  );
};
