import React from 'react';
import styles from './OnlineStatus.module.scss';
export default function OnlineStatusIcon({ onlineStatus }) {
  const onlineStatusList = {
    online: styles.online,
    offline: styles.offline,
  };
  return (
    <div className={styles.outer}>
      <div
        className={[styles.middle, onlineStatusList[onlineStatus]].join(' ')}
      >
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}
