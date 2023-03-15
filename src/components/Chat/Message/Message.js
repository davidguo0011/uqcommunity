import React from 'react';
import styles from './Message.module.scss';

export default function Message({
  chatName,
  message,
  avatar,
  reverse,
  dateTime,
}) {
  return (
    <div
      className={[styles.chatContainer, reverse && styles.alignRight].join(' ')}
    >
      {!reverse && <img src={avatar} alt='' />}
      <div
        className={[styles.messageContainer, reverse && styles.reverse].join(
          ' '
        )}
      >
        <h4>
          {reverse && (
            <>
              <span>{dateTime}</span> {chatName}
            </>
          )}
          {!reverse && (
            <>
              {chatName} <span>{dateTime}</span>
            </>
          )}
        </h4>
        <div className={styles.messageBox}>
          <p>{message}</p>
        </div>
      </div>
      {reverse && <img src={avatar} alt='' />}
    </div>
  );
}
