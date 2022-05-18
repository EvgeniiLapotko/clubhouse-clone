import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import styles from './Profile.module.scss';
import Avatar from '@mui/material/Avatar';
import { Button, IconButton } from '@mui/material';
import { Header } from '../../components/Header';
import Link from 'next/link';
import { BackButton } from '../../components/BackButton';
import axios from '../../core/axios';
import { checkAuth } from '../../helpers/checkAuth';

export default function Profile({ user }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header user={user.data} />
      <div className={'container'}>
        <div style={{ padding: '50px' }}>
          <BackButton />

          <div className={'d-flex justify-content-between aligh-items-center mb-30'}>
            <div className={styles.infoBlock}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={user?.data.avatar}
                className={'mt-10'}
              />
              <div className={'ml-30 mr-30'}>
                <h2 className={'mt-10 mb-10 '}>{user?.data.fullName}</h2>
                <h3 className={'mt-10 mb-10 '}>
                  @
                  {user.data.fullName
                    .split(' ')
                    .map((a) => a.toLowerCase())
                    .join('')}
                </h3>
              </div>
              <div className={'ml-40 mr-10'}>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  style={{ borderRadius: '50px' }}
                  size={'large'}
                >
                  Follow
                </Button>
              </div>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
            <div className={styles.follow}>
              <div>
                <span>3</span> <span>followers</span>
              </div>
              <div>
                <span>0</span> <span>following</span>
              </div>
            </div>
          </div>
          <div>
            <p>The search supports synonyms. Try searching for "hamburger" or "logout".</p>
          </div>
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
    return {
      props: {
        user,
        // rooms: data,
      },
    };
  } catch (e) {
    return {
      props: {
        user: {},
      },
    };
  }
};
