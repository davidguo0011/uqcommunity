import React from 'react';
import styles from './ChatInput.module.scss';
export default function ChatInput({ chatFriend }) {
  return (
    <div className={styles.chatInput}>
      <input type='text' placeholder={`消息@${chatFriend.name}`} />
    </div>
  );
}
