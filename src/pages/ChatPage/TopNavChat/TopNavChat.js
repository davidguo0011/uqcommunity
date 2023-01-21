import React from 'react';
import styles from './TopNavChat.module.scss';
import { BsFillChatDotsFill } from 'react-icons/bs';

export default function TopNavChat({ chatName }) {
  return (
    <div className={styles.topNavContainer}>
      <BsFillChatDotsFill />
      <div className={styles.chatName}>{chatName}</div>
    </div>
  );
}
