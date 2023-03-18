import React from 'react';
import styles from './TopNav.module.scss';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function TopNav({ chatFriend }) {
  const navigate = useNavigate();
  return (
    <div className={styles.topNavContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.header}>
          <span>
            <BsFillChatDotsFill />
          </span>
          <div className={styles.chatName}>{chatFriend.name}</div>
        </div>
        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              navigate(`/video/${chatFriend.id}`);
            }}
          >
            <BsFillTelephoneFill />
          </button>
        </div>
      </div>
    </div>
  );
}
