import React, { useState } from 'react';
import styles from './TopNavFriend.module.scss';
import { FaUserFriends } from 'react-icons/fa';

export default function TopNavFriend({ setCurrentType }) {
  const list = ['在线', '全部', '待定', '已屏蔽'];
  const [current, setCurrent] = useState('在线');

  return (
    <div className={styles.topNavContainer}>
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
    </div>
  );
}
