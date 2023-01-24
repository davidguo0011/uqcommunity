import React from 'react';
import styles from './FriendStatus.module.scss';
import OnlineStatusIcon from '../OnlineStatusIcon/OnlineStatusIcon';
import avatar from '../../assets/discord.png';
import { FiCheck } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { BsChatSquareFill } from 'react-icons/bs';
import { acceptFriendRequest } from '../../api/friends';

export default function FriendStatus({ setStatus, setChatName, friend }) {
  const acceptFriendAction = (action) => {
    const data = {
      sendId: localStorage.getItem('userId'),
      sendName: localStorage.getItem('userName'),
      receiverId: friend.id,
      receiverName: friend.name,
      action,
    };
    acceptFriendRequest(data).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className={styles.friendContainer}>
      <div className={styles.imgContainer}>
        <img src={avatar} alt='' className={styles.avatar} />
        <OnlineStatusIcon onlineStatus={friend.onlineStatus} />
      </div>
      <p>{friend.name}</p>
      <div className={styles.btnContainer}>
        {friend.friendShip === 'wait' && (
          <>
            <button
              className={styles.yes}
              onClick={() => {
                acceptFriendAction(1);
              }}
            >
              <FiCheck />
            </button>
            <button
              className={styles.no}
              onClick={() => {
                acceptFriendAction(0);
              }}
            >
              <MdOutlineClose />
            </button>
          </>
        )}
        {friend.friendShip === 'friend' && (
          <button
            className={styles.chat}
            onClick={() => {
              setStatus('chat');
              setChatName(friend.name);
            }}
          >
            <BsChatSquareFill />
          </button>
        )}
      </div>
    </div>
  );
}
