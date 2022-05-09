import styles from './Name.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { TextField } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import { useContext, useState } from 'react';
import { MainContext } from '../../../pages';

export const NameStep = () => {
  const [value, setValue] = useState<string>('');
  const { onNextStep } = useContext(MainContext);

  const onClickNextStep = () => {
    onNextStep();
  };

  return (
    <>
      <StepInfo
        title="What's your full name?"
        description='People use real name on Clubhouse'
        icon={<ModeIcon />}
      />
      <WhiteBlock className={styles.block}>
        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          className={'mb-15'}
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
          <Button disabled={value.length < 3} onClick={onClickNextStep}>
            Next
          </Button>
        </div>
      </WhiteBlock>
    </>
  );
};
