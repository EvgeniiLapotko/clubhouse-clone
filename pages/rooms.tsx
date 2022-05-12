import { Header } from '../components/Header';
import { Button } from '@mui/material';
import { CardRoom } from '../components/CardRoom';
import Link from 'next/link';
import styles from '../components/CardRoom/CardRoom.module.scss';

export default function Room() {
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
          <Link href={'/rooms/testRoom'}>
            <a className={styles.block}>
              <CardRoom
                users={['user1', 'user2']}
                speakersCount={3}
                listenerCount={10}
                title={'New rooms'}
                avatars={[
                  'https://media.istockphoto.com/photos/abstract-human-face-the-power-of-the-mind-artificial-intelligence-picture-id1357759108',
                  'https://media.istockphoto.com/photos/digitized-model-of-a-male-human-head-science-fiction-robot-concept-picture-id1336292858',
                ]}
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
