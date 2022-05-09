import { WelcomeStep } from '../components/steps/WelcomeStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import React, { useState } from 'react';
import { NameStep } from '../components/steps/NameStep';
import { ChoosePhotoStep } from '../components/steps/ChoosePhotoStep';
import { ActivateCodeStep } from '../components/steps/ActivadeCodeStep';

const stepsComponent = {
  0: WelcomeStep,
  1: NameStep,
  2: ChoosePhotoStep,
  3: EnterPhoneStep,
  4: ActivateCodeStep,
};

type MainContextProps = {
  onNextStep: () => void;
  step: number;
};

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
  const [step, setStep] = useState<number>(0);

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const Step = stepsComponent[step];
  return (
    <MainContext.Provider value={{ step, onNextStep }}>
      <Step />
    </MainContext.Provider>
  );
}
