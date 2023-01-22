import React, { useState } from 'react';
import styles from './TopNav.module.scss';
import { FaUserFriends } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';

export default function TopNav({ setCurrentType, type, chatName }) {
  const list = ['在线', '全部', '待定', '已屏蔽'];
  const [current, setCurrent] = useState('在线');

  return (
    <div className={styles.topNavContainer}>
      {type === 'friends' ? (
        <>
          <div className={styles.category}>
            <FaUserFriends />
            好友
          </div>
          <ul className={styles.status}>
            {list.map((item) => {
              return (
                <button
                  onClick={() => {
                    setCurrentType(item);
                    setCurrent(item);
                  }}
                  className={current === item ? styles.active : ''}
                  key={item}
                >
                  {item}
                </button>
              );
            })}
            <li>
              <button
                onClick={() => {
                  setCurrentType('添加好友');
                  setCurrent('添加好友');
                }}
                className={styles.addFriend}
              >
                添加好友
              </button>
            </li>
          </ul>
        </>
      ) : (
        <div className={styles.chatHeader}>
          <BsFillChatDotsFill />
          <div className={styles.chatName}>{chatName}</div>
        </div>
      )}
    </div>
  );
}
