import styles from './EnterPhone.module.scss';
import { WhiteBlock } from '../../WhiteBlock';
import { Button } from '../../Button';
import { StepInfo } from '../../StepInfo';
import NumberFormat from 'react-number-format';
import { useState } from 'react';

type InputValue = {
  formattedValue: string;
  value: string;
};

export const EnterPhoneStep = () => {
  const [inputValues, setValue] = useState<InputValue>({} as InputValue);

  const nextDisabled = !inputValues.formattedValue || inputValues.formattedValue.includes('_');

  return (
    <>
      <StepInfo
        title='Enter your phone number?'
        description='Without number we will not give you use it'
      />

      <WhiteBlock className={styles.block}>
        <h3 className={styles.title}>Enter Phone Number!</h3>

        <NumberFormat
          className={styles.phoneBlock}
          format='+# (###) ###-##-##'
          mask='_'
          placeholder='+7 (999) 333-22-11'
          value={inputValues.value}
          onValueChange={({ formattedValue, value }) => {
            setValue({ formattedValue, value });
          }}
        />

        <div>
          <Button disabled={nextDisabled}>Next</Button>
        </div>
      </WhiteBlock>
    </>
  );
};
