import styles from './ActivateCode.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const ActivateCodeStep = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

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

          <div>
            <Button disabled={nextDisabled || isLoading} onClick={() => setIsLoading(true)}>
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
    </>
  );
};
