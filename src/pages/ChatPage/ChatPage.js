import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import styles from './ChatPage.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';
import TopNav from './TopNav/TopNav';
import RightSideMenu from '../../components/RightSideMenu/RightSideMenu';
import useChatReducer from '../../hooks/useChatReducer';

export default function ChatPage() {
  const { friendState, socket, userId } = useOutletContext();
  const { chatId } = useParams();
  const userName = localStorage.getItem('userName');
  const chatFriend = friendState.friends.filter((friend) => {
    return friend.id === parseInt(chatId);
  })[0];
  const [chatState, chatDispatch] = useChatReducer();

  const sendMessage = (message) => {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    const data = {
      type: 3,
      sendId: userId,
      sendName: userName,
      receiverId: chatFriend.id,
      receiverName: chatFriend.name,
      message,
      messageId: `${Date.now()}:${userId}:${chatFriend.id}:${randomSixDigits}`,
    };
    socket.send(JSON.stringify(data));
    chatDispatch({ type: 'addMessage', message: data });
  };

  return (
    <>
      <TopNav chatFriend={chatFriend} />
      <div className={styles.friendContainer}>
        <ChatRoom
          chatFriend={chatFriend}
          socket={socket}
          userId={userId}
          userName={userName}
          messages={chatState.messages}
          sendMessage={sendMessage}
        />
        <RightSideMenu />
      </div>
    </>
  );
}
