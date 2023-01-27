import React from 'react';
import styles from './FriendRequestNotification.module.scss';
export default function FriendRequestNotification({ notification }) {
  return <div className={styles.notification}>{notification}</div>;
}
