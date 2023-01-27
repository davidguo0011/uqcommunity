import React, { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import styles from './ChatPage.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';
import TopNav from './TopNav/TopNav';
import RightSideMenu from '../../components/RightSideMenu/RightSideMenu';

export default function ChatPage() {
  const [state, socket, dispatch, userId] = useOutletContext();
  const { chatId } = useParams();
  const chatFriend = state.friends.filter((friend) => {
    return friend.id === chatId;
  })[0];

  //const data = {
  //   type: 2,
  //   sendId,
  //   sendName: localStorage.getItem('userName'),
  //   receiverId,
  //   receiverName,
  //   message: 'addFriend',
  //   messageId: `${Date.now()}:${sendId}:${receiverId}:${randomSixDigits}`,
  // };

  const handleMessage = (message) => {
    // if (message.type === 2) {
    //   const newFriends = [
    //     ...friends,
    //     {
    //       id: message.sendId,
    //       name: message.sendName,
    //       onlineStatus: 'online',
    //       friendShip: 'wait',
    //     },
    //   ];
    //   console.log(newFriends);
    //   setFriends(newFriends);
    // }
  };

  return (
    <>
      <TopNav chatFriend={chatFriend} />
      <div className={styles.friendContainer}>
        <ChatRoom chatFriend={chatFriend} socket={socket} userId={userId} />
        <RightSideMenu />
      </div>
    </>
  );
}
