import React from 'react';
import styles from './Notification.module.scss';
export default function Notification({ notification }) {
  return <div className={styles.notification}>{notification}</div>;
}
