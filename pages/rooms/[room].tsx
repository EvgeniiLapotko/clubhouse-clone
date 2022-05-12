import { Header } from '../../components/Header';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { BackButton } from '../../components/BackButton';
import { useState } from 'react';
import { RoomView } from '../../components/RoomView';

export default function Room() {
  const router = useRouter();
  const { room } = router.query;

  return (
    <>
      <Header />
      <div className={'container'}>
        <BackButton title={'All rooms'} />
        <RoomView title={room} />
      </div>
    </>
  );
}
