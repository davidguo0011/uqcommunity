import React, { useState } from 'react';
import styles from './ChatInput.module.scss';
export default function ChatInput({ chatFriend, sendMessage }) {
  const [input, setInput] = useState('');
  return (
    <div
      className={styles.chatInput}
      onKeyDown={(e) => {
        if (input && e.key === 'Enter') {
          sendMessage(input);
          setInput('');
        }
      }}
    >
      <input
        type='text'
        value={input}
        placeholder={`消息@${chatFriend.name}`}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </div>
  );
}
