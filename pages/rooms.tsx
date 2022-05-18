import { Header } from '../components/Header';
import { Button } from '@mui/material';
import { CardRoom } from '../components/CardRoom';
import Link from 'next/link';
import styles from '../components/CardRoom/CardRoom.module.scss';
import axios from '../core/axios';
import nookies from 'nookies';
import { UserApi } from '../api/UserApi';
import { checkAuth } from '../helpers/checkAuth';

export default function Room({ rooms = [] }) {
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
          >
            Start a room
          </Button>
        </div>
        <div className={'d-flex d-wrap'} style={{ marginLeft: '-20px' }}>
          {rooms.map((room) => {
            return (
              <Link href={`/rooms/${room._id}`} key={room._id}>
                <a className={styles.block}>
                  <CardRoom
                    guest={room.guest}
                    speakersCount={room.speakers}
                    listenerCount={room.listener}
                    title={room.title}
                    avatars={room.avatars}
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
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
    const { data } = await axios.get('/rooms.json');
    return {
      props: {
        user: user,
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
