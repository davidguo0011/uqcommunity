import React from 'react';
import styles from './FriendRequestNotification.module.scss';
export default function FriendRequestNotification({ number }) {
  return <div className={styles.notification}>{number}</div>;
}
