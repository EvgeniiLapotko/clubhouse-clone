import React from 'react';
import styles from './CardRoom.module.scss';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import clsx from 'clsx';

interface CardRoom {
  speakers: any[];
  title: string;
}

export const CardRoom: React.FC<CardRoom> = ({ speakers, title }) => {
  return (
    <>
      <div className={styles.title}>{title}</div>
      <div className={'d-flex'} style={{ height: 'calc(100% - 40px)' }}>
        <div className={styles.avatarBlock}>
          {speakers?.slice(0, 2).map((speaker, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  speakers.length > 1 && index === speakers.length - 1 ? styles.lastAvatar : '',
                  speakers.length === 1 && styles.firstAvatar
                )}
              >
                <Avatar src={speaker.avatar} sx={{ width: 70, height: 70 }} />
              </div>
            );
          })}
        </div>

        <div className={'d-flex flex-column justify-content-between'} style={{ width: '100%' }}>
          <div className={'mb-10'}>
            {!speakers.length && <h4 style={{ color: '#939393' }}>Room's empty</h4>}
            {speakers?.slice(0, 4).map((user, index) => {
              return (
                <p key={index} className={styles.users}>
                  {user.fullName}
                </p>
              );
            })}
          </div>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <PersonIcon />
              <span>{speakers.length}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
