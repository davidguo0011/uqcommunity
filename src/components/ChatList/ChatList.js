import React, { useState } from 'react';
import styles from './ChatList.module.scss';
import { FaUserFriends } from 'react-icons/fa';
import Friend from '../Chat/Friend/Friend';
import Me from '../Chat/Me/Me';
import { Link } from 'react-router-dom';
import Notification from '../Notification/Notification';

export default function ChatList({ friendState }) {
  const userName = localStorage.getItem('userName');
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className={styles.chatListContainer}>
      <div className={styles.searchBar}>
        <input
          type='text'
          value={searchInput}
          placeholder='寻找或开始新的对话'
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Link to={`/friends`}>
          <FaUserFriends className={styles.friendIcon} />
          好友
          {friendState.notification > 0 && (
            <Notification notification={friendState.notification} />
          )}
        </Link>
      </div>
      <div className={styles.friendList}>
        <div className={styles.header}>
          <p>私信</p>
          <button>+</button>
        </div>

        {friendState.friends
          .filter((friend) => {
            return (
              friend.friendship === 'friend' &&
              friend.name.includes(searchInput)
            );
          })
          .map((friend) => {
            return (
              <Link to={`/chat/${friend.id}`} key={friend.id}>
                <Friend name={friend.name} onlineStatus={friend.onlineStatus} />
              </Link>
            );
          })}
      </div>
      <Me name={userName} />
    </div>
  );
}
