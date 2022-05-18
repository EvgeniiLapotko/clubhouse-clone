import { WelcomeStep } from '../components/steps/WelcomeStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import React, { useState } from 'react';
import { NameStep } from '../components/steps/NameStep';
import { ChoosePhotoStep } from '../components/steps/ChoosePhotoStep';
import { ActivateCodeStep } from '../components/steps/ActivadeCodeStep';
import { checkAuth } from '../helpers/checkAuth';
import axios from '../core/axios';

const stepsComponent = {
  0: WelcomeStep,
  1: EnterPhoneStep,
  2: ActivateCodeStep,
  3: NameStep,
  4: ChoosePhotoStep,
};

type MainContextProps = {
  onNextStep: () => void;
  step: number;
  setUserData: (data: UserData) => void;
  userData: UserData;
};

export type UserData = {
  fullName: string;
  avatar: string;
  phone: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  token?: string;
};

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const Step = stepsComponent[step];
  return (
    <MainContext.Provider value={{ step, onNextStep, userData, setUserData }}>
      <Step />
    </MainContext.Provider>
  );
}

export const getServerSideProps = async (ctx) => {
  const user = await checkAuth(ctx);
  if (user) {
    return {
      props: {},
      redirect: {
        destination: '/rooms',
      },
    };
  } else {
    return {
      props: {
        rooms: [],
      },
    };
  }
};
