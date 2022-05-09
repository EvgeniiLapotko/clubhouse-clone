import clsx from 'clsx';

import styles from './Button.module.scss';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface Button {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
  disabled?: boolean;
  color?: 'green' | 'gray';
  className?: string;
}

export const Button: React.FC<Button> = ({ onClick, children, disabled, color, className }) => {
  const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
  };
  return (
    <button
      onClick={onClick}
      type='button'
      disabled={disabled}
      className={clsx(className, styles.button, colors[color])}
    >
      {children}
      <ArrowRightAltIcon />
    </button>
  );
};
