import React from 'react';
import styles from './TopNav.module.scss';
import { FaUserFriends } from 'react-icons/fa';
import Notification from '../../../components/Notification/Notification';

export default function TopNav({ friendState, setCurrentType, currentType }) {
  const list = ['在线', '全部', '待定', '已屏蔽'];

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
              key={item}
              onClick={() => {
                setCurrentType(item);
              }}
              className={currentType === item ? styles.active : ''}
            >
              <p>{item}</p>
              {item === '待定' && friendState.addFriendNotification > 0 && (
                <Notification
                  notification={friendState.addFriendNotification}
                />
              )}
            </button>
          );
        })}
        <li>
          <button
            className={styles.addFriend}
            onClick={() => {
              setCurrentType('添加好友');
            }}
          >
            添加好友
          </button>
        </li>
      </ul>
    </div>
  );
}
