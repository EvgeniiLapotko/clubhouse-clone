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
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { RootState, wrapper } from '../../redux/store';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const userData = useSelector((state: RootState) => selectUser(state.userReducer));

  return (
    <>
      <Header />
      <div className={'container'}>
        <div style={{ padding: '50px' }}>
          <BackButton />

          <div className={'d-flex justify-content-between aligh-items-center mb-30'}>
            <div className={styles.infoBlock}>
              <Avatar sx={{ width: 100, height: 100 }} src={userData?.avatar} className={'mt-10'} />
              <div className={'ml-30 mr-30'}>
                <h2 className={'mt-10 mb-10 '}>{userData?.fullName}</h2>
                <h3 className={'mt-10 mb-10 '}>
                  @
                  {userData?.fullName
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
  } catch (e) {
    throw new Error(e);
  }
});
