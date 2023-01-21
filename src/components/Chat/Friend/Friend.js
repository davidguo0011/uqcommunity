import React from 'react';
import styles from './Friend.module.scss';
import avatar from '../../../assets/discord.png';
import useClickOutside from '../../../hooks/clickOutside';
export default function Friend({ name, setStatus, setChatName }) {
  const { visible, setVisible, myref } = useClickOutside(false);
  return (
    <div className={styles.friendContainer} ref={myref}>
      <button
        className={[styles.friendBtn, visible && styles.active].join(' ')}
        onClick={() => {
          setVisible(true);
          setStatus('chat');
          setChatName(name);
        }}
      >
        <img src={avatar} alt='avatar' className={styles.avatar} />
        <p>{name}</p>
      </button>
    </div>
  );
}
