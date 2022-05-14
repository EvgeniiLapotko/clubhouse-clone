import Avatar from '@mui/material/Avatar';
import styles from './Header.module.scss';
import Link from 'next/link';

export const Header = () => {
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
          <span>User Name</span>

          <Avatar src={'https://source.unsplash.com/random/100x100?834'} />
        </div>
      </Link>
    </div>
  );
};