import React, { useState } from 'react';
import styles from './Friends.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import TopNavFriend from '../TopNavFriend/TopNavFriend';

export default function Friend() {
  const [currentType, setCurrentType] = useState('在线');

  return (
    <>
      <TopNavFriend setCurrentType={setCurrentType} />
      <div className={styles.friendContainer}>
        {currentType === '添加好友' ? (
          <div className={styles.addFriendContainer}>
            <h2>添加好友</h2>
            <div className={styles.addFriend}>
              <input type='text' placeholder='输入用户名' />
              <button className={styles.addFriendBtn}>发送好友请求</button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.searchContainer}>
              <input type='text' placeholder='搜索' />
              <AiOutlineSearch className={styles.searchIcon} />
            </div>
            <div className={styles.friendList}>
              <p>{currentType}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
