import React from 'react';
import styles from './LoadChatRoomSpinner.module.scss';

export default function LoadChatRoomSpinner() {
  return (
    <div className={styles.chatRoomLoaderContainer}>
      <span className={styles.loader}></span>
    </div>
  );
}
