import styles from './Name.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';

export const NameStep = () => {
  return (
    <>
      <StepInfo title="What's your full name?" description='People use real name on Clubhouse' />
      <WhiteBlock className={styles.block}>
        <input className={styles.input} placeholder='Enter Name' />
        <div>
          <Button>
            Next
            {/*<img className='d-ib ml-10 ' src='./static/arrow.png' alt='arrow' />*/}
          </Button>
        </div>
      </WhiteBlock>
    </>
  );
};
