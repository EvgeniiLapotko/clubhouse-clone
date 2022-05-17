import styles from './ActivateCode.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import React, { useContext, useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import jsCookie from 'js-cookie';

import axios from '../../../core/axios';
import { useRouter } from 'next/router';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MainContext } from '../../../pages';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const ActivateCodeStep = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userData, onNextStep, setUserData } = useContext(MainContext);

  const nextDisabled = code.some((v) => !v);

  const handleChangeInput = (e) => {
    const id = Number(e.target.getAttribute('id')) - 1;
    const value = e.target.value;
    setCode((prev) => {
      const newArr = [...prev];
      newArr[id] = value;
      return newArr;
    });
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/auth', userData);
      console.log(data);
      if (data.isActive) {
        await router.push('/rooms');
      }
      setUserData(data);
      onNextStep();
    } catch (e) {
      setOpen(true);
    }

    setIsLoading(false);
  };

  return (
    <>
      <StepInfo
        title='Enter your activate code'
        description='It was send to your phone'
        icon={<CheckCircleOutlineIcon />}
      />
      <div style={{ opacity: isLoading ? 0.5 : undefined }}>
        <WhiteBlock className={styles.block}>
          <div className={styles.inputBlock}>
            <input
              type='tel'
              placeholder='X'
              maxLength={1}
              id='1'
              onChange={handleChangeInput}
              value={code[0]}
              disabled={isLoading}
            />
            <input
              type='tel'
              placeholder='X'
              maxLength={1}
              id='2'
              onChange={handleChangeInput}
              value={code[1]}
              disabled={isLoading}
            />
            <input
              type='tel'
              placeholder='X'
              maxLength={1}
              id='3'
              onChange={handleChangeInput}
              value={code[2]}
              disabled={isLoading}
            />
            <input
              type='tel'
              placeholder='X'
              maxLength={1}
              id='4'
              onChange={handleChangeInput}
              value={code[3]}
              disabled={isLoading}
            />
          </div>
          <div style={{ color: 'grey', marginBottom: '10px' }}>
            You can use any code. This step is not active
          </div>
          <div>
            <Button disabled={nextDisabled || isLoading} onClick={onSubmit}>
              Activate
            </Button>
          </div>
        </WhiteBlock>
      </div>
      {isLoading && (
        <div className={styles.ldsEllipsisWrapper}>
          <div className={styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity='error'>Code is wrong</Alert>
      </Snackbar>
    </>
  );
};
