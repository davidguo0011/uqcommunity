import React, { useContext } from 'react';
import styles from './FriendStatus.module.scss';
import OnlineStatusIcon from '../OnlineStatusIcon/OnlineStatusIcon';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { BsChatSquareFill } from 'react-icons/bs';
import { acceptFriendRequest } from '../../api/friends';
import { UserContext } from '../../context/UserContext';

export default function FriendStatus({ friendDispatch, friend }) {
  const userContext = useContext(UserContext);

  const acceptFriendAction = (action) => {
    const data = {
      sendId: userContext.userState.userId,
      sendName: userContext.userState.userName,
      receiverId: friend.id,
      receiverName: friend.name,
      action,
    };

    acceptFriendRequest(data);
    if (action === 1) {
      friendDispatch({ type: 'acceptFriend', id: friend.id });
    } else {
      friendDispatch({ type: 'denyFriend', id: friend.id });
    }
  };
  return (
    <div className={styles.friendContainer}>
      <div className={styles.imgContainer}>
        <img src={friend.avatar} alt='' className={styles.avatar} />
        <OnlineStatusIcon onlineStatus={friend.onlineStatus} />
      </div>
      <p>{friend.name}</p>
      <div className={styles.btnContainer}>
        {friend.friendship === 'wait' && (
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
                acceptFriendAction(2);
              }}
            >
              <MdOutlineClose />
            </button>
          </>
        )}
        {friend.friendship === 'friend' && (
          <Link to={`/chat/${friend.id}`} className={styles.chat}>
            <BsChatSquareFill />
          </Link>
        )}
      </div>
    </div>
  );
}
