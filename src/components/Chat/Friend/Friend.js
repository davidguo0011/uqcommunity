import React, { useState } from 'react';
import styles from './Friend.module.scss';
import useClickOutside from '../../../hooks/useClickOutside';
import { MdClose } from 'react-icons/md';
import OnlineStatusIcon from '../../OnlineStatusIcon/OnlineStatusIcon';
import { toast } from 'react-toastify';
import Notification from '../../Notification/Notification';
export default function Friend({ name, avatar, onlineStatus, notification }) {
  const { visible, setVisible, myref } = useClickOutside(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  return (
    <div
      className={[styles.friendContainer, visible && styles.active].join(' ')}
      ref={myref}
      onMouseOver={() => {
        setShowDeleteBtn(true);
      }}
      onMouseOut={() => {
        setShowDeleteBtn(false);
      }}
    >
      <button
        className={styles.friendBtn}
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className={styles.imgContainer}>
          <img src={avatar} alt='avatar' className={styles.avatar} />
          <OnlineStatusIcon onlineStatus={onlineStatus} />
        </div>
        <p>{name}</p>
        {notification > 0 && <Notification notification={notification} />}
      </button>
      <button
        className={[
          styles.deleteFriendBtn,
          showDeleteBtn && styles.showDeleteBtn,
        ].join(' ')}
        onClick={() => {
          toast.error('deleteFriend', { theme: 'colored' });
        }}
      >
        <MdClose />
      </button>
    </div>
  );
}
