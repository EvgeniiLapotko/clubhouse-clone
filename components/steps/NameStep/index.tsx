import styles from './Name.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import { TextField } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';

export const NameStep = () => {
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
        />
        <div>
          <Button>Next</Button>
        </div>
      </WhiteBlock>
    </>
  );
};
