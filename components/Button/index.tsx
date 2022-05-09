import clsx from 'clsx';

import styles from './Button.module.scss';

export const Button = ({ onClick, children, disabled, color, className }) => {
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
    </button>
  );
};
