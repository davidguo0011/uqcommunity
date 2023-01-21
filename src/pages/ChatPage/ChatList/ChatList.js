import React from 'react';
import styles from './ChatList.module.scss';
import { FaUserFriends } from 'react-icons/fa';
import Friend from '../../../components/Chat/Friend/Friend';
import Me from '../../../components/Chat/Me/Me';

export default function ChatList({ setStatus, setChatName, friendListDummy }) {
  return (
    <div className={styles.chatListContainer}>
      <div className={styles.searchBar}>
        <input type='text' placeholder='寻找或开始新的对话' />
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            setStatus('friends');
          }}
        >
          <FaUserFriends className={styles.friendIcon} />
          好友
        </button>
      </div>
      <div className={styles.friendList}>
        <div className={styles.header}>
          <p>私信</p>
          <button>+</button>
        </div>
        {friendListDummy.map((friend) => {
          return (
            <Friend
              name={friend.name}
              key={friend.id}
              setStatus={setStatus}
              setChatName={setChatName}
            />
          );
        })}
      </div>
      <div className={styles.me}>
        <Me name='davidguo' />
      </div>
    </div>
  );
}
