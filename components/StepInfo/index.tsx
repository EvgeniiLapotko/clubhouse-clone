import clsx from 'clsx';
import styles from './StepInfo.module.scss';
import React from 'react';

interface StepInfo {
  title: string;
  description?: string;
  icon?: any;
}

export const StepInfo: React.FC<StepInfo> = ({ title, description, icon }) => {
  return (
    <div className={clsx(styles.block, 'text-center')}>
      {icon && <div className={styles.icon}>{icon}</div>}

      <b className={styles.title}>{title}</b>

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
