import React from 'react';
import styles from './CardRoom.module.scss';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import clsx from 'clsx';

interface CardRoom {
  guest: string[];
  avatars?: string[];
  speakersCount: number;
  listenerCount: number;
  title: string;
}

export const CardRoom: React.FC<CardRoom> = ({
  guest,
  avatars = [],
  speakersCount,
  listenerCount,
  title,
}) => {
  return (
    <>
      <div className={styles.title}>{title}</div>
      <div className={'d-flex'} style={{ height: 'calc(100% - 40px)' }}>
        <div className={styles.avatarBlock}>
          {avatars.map((av, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  avatars.length > 1 && index === avatars.length - 1 ? styles.lastAvatar : '',
                  avatars.length === 1 && styles.firstAvatar
                )}
              >
                <Avatar src={av} sx={{ width: 70, height: 70 }} />
              </div>
            );
          })}
        </div>
        <div className={'d-flex flex-column justify-content-between'} style={{ width: '100%' }}>
          <div className={'mb-10'}>
            {guest.map((user, index) => {
              return (
                <p key={index} className={styles.users}>
                  {user}
                </p>
              );
            })}
          </div>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <PersonIcon />
              <span>{speakersCount}</span>
            </div>
            <div className={styles.infoItem}>
              <ChatIcon />
              <span>{listenerCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
