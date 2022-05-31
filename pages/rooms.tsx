import { Header } from '../components/Header';
import { Button } from '@mui/material';
import { CardRoom } from '../components/CardRoom';
import Link from 'next/link';
import styles from '../components/CardRoom/CardRoom.module.scss';
import { checkAuth } from '../helpers/checkAuth';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { ModalBlock } from '../components/ModalBlock';
import { useSelector } from 'react-redux';
import { fetchRooms, selectRooms } from '../redux/slices/roomSlice';
import { RootState, wrapper } from '../redux/store';

export default function Room({ rooms = [], user }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const roomsStore = useSelector((state: RootState) => selectRooms(state.roomReducer));
  if (typeof window !== undefined) {
    // console.log(roomsStore);
  }

  return (
    <>
      <Header />
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
          {roomsStore?.map((room) => {
            return (
              <Link href={`/rooms/${room.id}`} key={room.id}>
                <a className={styles.block}>
                  <CardRoom speakers={room.speakers} title={room.title} />
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const user = await checkAuth(ctx, store);
    if (!user) {
      return {
        props: [],
        redirect: {
          destination: '/',
        },
      };
    }
    await store.dispatch(fetchRooms());
  } catch (e) {
    throw new Error(e);
  }
});
