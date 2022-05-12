import React from 'react';
import styles from './User.module.scss';

interface User {
  user: any;
}

export const User: React.FC<User> = ({ user }) => {
  return <p>user</p>;
};
