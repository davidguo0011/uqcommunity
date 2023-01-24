import React from 'react';
import styles from './TopNav.module.scss';
import { BsFillChatDotsFill } from 'react-icons/bs';

export default function TopNav({ chatFriend }) {
  return (
    <div className={styles.topNavContainer}>
      <div className={styles.chatHeader}>
        <BsFillChatDotsFill />
        <div className={styles.chatName}>{chatFriend.name}</div>
      </div>
    </div>
  );
}
