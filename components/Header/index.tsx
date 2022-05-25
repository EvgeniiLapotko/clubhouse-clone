import Avatar from '@mui/material/Avatar';
import styles from './Header.module.scss';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';
import { selectRooms } from '../../redux/slices/roomSlice';

export const Header = () => {
  const userData = useSelector((state: RootState) => selectUser(state.userReducer));
  return (
    <div className={styles.block}>
      <Link href={'/rooms'} className={'cup'}>
        <div className={styles.logo}>
          <img src='../static/hand-wave.png' alt='' />
          <div>Clubhouse</div>
        </div>
      </Link>

      <Link href={'/profile/123'} className={'cup'}>
        <div className={styles.info}>
          <span>{userData?.fullName}</span>

          <Avatar src={userData?.avatar} />
        </div>
      </Link>
    </div>
  );
};
