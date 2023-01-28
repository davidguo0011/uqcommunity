import React, { useState } from 'react';
import styles from './FriendsStatus.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import FriendStatus from '../../../components/FriendStatus/FriendStatus';

export default function FriendsStatus({
  friendDispatch,
  socket,
  friendState,
  currentType,
}) {
  const [userIdInput, setUserIdInput] = useState('');
  const [searchInput, setSearchInput] = useState('');

  let friendList = [];
  if (currentType === '在线') {
    friendList = friendState.friends.filter((friend) => {
      return friend.onlineStatus === 'online' && friend.friendship === 'friend';
    });
  } else if (currentType === '全部') {
    friendList = friendState.friends.filter((friend) => {
      return friend.friendship === 'friend';
    });
  } else if (currentType === '待定') {
    friendList = friendState.friends.filter((friend) => {
      return friend.friendship === 'wait';
    });
  } else if (currentType === '已屏蔽') {
    friendList = friendState.friends.filter((friend) => {
      return friend.friendship === 'block';
    });
  }

  const sendFriendRequest = () => {
    if (!userIdInput) {
      return;
    }
    let friendExist = false;
    const receiverList = userIdInput.split('#');
    const receiverId = parseInt(receiverList[1]);
    friendState.friends.forEach((friend) => {
      if (friend.id === receiverId) {
        friendExist = true;
      }
    });
    if (friendExist) {
      console.log('friend exist');
      return;
    }
    const receiverName = receiverList[0];
    const sendId = parseInt(localStorage.getItem('userId'));
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);

    const data = {
      type: 2,
      sendId,
      sendName: localStorage.getItem('userName'),
      receiverId,
      receiverName,
      message: 'addFriend',
      messageId: `${Date.now()}:${sendId}:${receiverId}:${randomSixDigits}`,
    };
    socket.send(JSON.stringify(data));
    setUserIdInput('');
  };
  return (
    <div className={styles.friendContainer}>
      {currentType === '添加好友' ? (
        <div className={styles.addFriendContainer}>
          <h2>添加好友</h2>
          <div className={styles.addFriend}>
            <input
              type='text'
              placeholder='输入用户名#ID'
              value={userIdInput}
              onChange={(e) => {
                setUserIdInput(e.target.value);
              }}
            />
            <button className={styles.addFriendBtn} onClick={sendFriendRequest}>
              发送好友请求
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.searchContainer}>
            <input
              type='text'
              placeholder='搜索'
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <AiOutlineSearch className={styles.searchIcon} />
          </div>
          <div className={styles.friendList}>
            <p>
              {currentType}-{friendList.length}
            </p>
          </div>
          {friendList
            .filter((friend) => {
              return friend.name.includes(searchInput);
            })
            .map((friend) => {
              return (
                <FriendStatus
                  friendDispatch={friendDispatch}
                  key={friend.id}
                  friend={friend}
                />
              );
            })}
        </>
      )}
    </div>
  );
}
