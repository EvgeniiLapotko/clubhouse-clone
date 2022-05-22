import { Header } from '../components/Header';
import { Button } from '@mui/material';
import { CardRoom } from '../components/CardRoom';
import Link from 'next/link';
import styles from '../components/CardRoom/CardRoom.module.scss';
import { checkAuth } from '../helpers/checkAuth';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { ModalBlock } from '../components/ModalBlock';
import axios from '../core/axios';

export default function Room({ rooms = [], user }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (typeof window !== undefined) {
    // console.log(rooms);
  }
  return (
    <>
      <Header user={user.data} />
      <div className={'container'}>
        <div className={'d-flex justify-content-between aligh-items-center mv-30'}>
          <h1>All rooms</h1>
          <Button
            variant={'contained'}
            color={'primary'}
            style={{ borderRadius: '50px' }}
            size={'large'}
            onClick={handleOpen}
          >
            Start a room
          </Button>
        </div>
        <div className={'d-flex d-wrap'} style={{ marginLeft: '-20px' }}>
          {rooms.map((room) => {
            return (
              <Link href={`/rooms/${room.id}`} key={room.id}>
                <a className={styles.block}>
                  <CardRoom
                    guest={room.guest}
                    speakersCount={room.speackers.count}
                    listenerCount={room.listenersCount}
                    title={room.title}
                    avatars={room.speackers.avatars}
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div>
          <ModalBlock onClose={handleClose} />
        </div>
      </Modal>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const user = await checkAuth(ctx);
    if (!user) {
      return {
        props: [],
        redirect: {
          destination: '/',
        },
      };
    }
    const { data } = await axios.get('rooms');
    return {
      props: {
        user,
        rooms: data,
      },
    };
  } catch (e) {
    return {
      props: {
        rooms: [],
      },
    };
  }
};
