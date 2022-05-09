import Avatar from '@mui/material/Avatar';
import styles from './Header.module.scss';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className={styles.block}>
      <div className={styles.logo}>
        <img src='../static/hand-wave.png' alt='' />
        <div>Clubhouse</div>
      </div>
      <Link href={'/profile/123'} className={'cup'}>
        <div className={styles.info}>
          <span>User Name</span>

          <Avatar />
        </div>
      </Link>
    </div>
  );
};
