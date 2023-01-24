import React from 'react';
import styles from './Message.module.scss';
import avatar from '../../../assets/discord.png';

export default function Message({ chatName, message, reverse, dateTime }) {
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
              <span>今天 12:00</span> {chatName}
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
