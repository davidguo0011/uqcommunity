import React from 'react';
import styles from './Message.module.scss';
import avatar from '../../../assets/discord.png';

export default function Message({ chatName, message, reverse }) {
  return (
    <div
      className={[styles.chatContainer, reverse && styles.alignRight].join(' ')}
    >
      {!reverse && <img src={avatar} alt='' />}
      <div className={styles.messageContainer}>
        <h4 className={reverse ? styles.reverse : ''}>
          {reverse && (
            <>
              <span>今天 12:00</span> {chatName}
            </>
          )}
          {!reverse && (
            <>
              {chatName} <span>今天 12:00</span>
            </>
          )}
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam esse
          atque nobis vel hic quisquam minima est consequatur quas beatae?
        </p>
      </div>
      {reverse && <img src={avatar} alt='' />}
    </div>
  );
}
