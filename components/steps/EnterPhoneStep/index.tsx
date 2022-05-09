import styles from './EnterPhone.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';

export const EnterPhoneStep = () => {
  return (
    <WhiteBlock className={styles.block}>
      <h3 className={styles.title}>Enter Phone Number!</h3>
      <p>
        We're working hard to get Clubhouse ready for everyone! While we wrap up the finishing,
        we're adding people gradually to make sure nothing breaks;)
      </p>
      <div>
        <Button>
          Set number
          {/*<img className='d-ib ml-10 ' src='./static/arrow.png' alt='arrow' />*/}
        </Button>
      </div>
    </WhiteBlock>
  );
};
