import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

import styles from './BackButton.module.scss';
import React from 'react';

interface BackButton {
  title?: string;
  href?: string;
}

export const BackButton: React.FC<BackButton> = ({ title = 'Back', href = '/rooms' }) => {
  return (
    <Link href={href}>
      <div className={styles.backBLock}>
        <ArrowBackIcon />
        <span>{title}</span>
      </div>
    </Link>
  );
};
