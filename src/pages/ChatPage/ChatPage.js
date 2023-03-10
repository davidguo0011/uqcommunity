import React, { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import styles from './ChatPage.module.scss';
import ChatRoom from './ChatRoom/ChatRoom';
import TopNav from './TopNav/TopNav';
import RightSideMenu from '../../components/RightSideMenu/RightSideMenu';
import { useEffect } from 'react';
import LoadChatRoomSpinner from '../../components/Spinner/LoadChatRoomSpinner/LoadChatRoomSpinner';
import { getMessages } from '../../api/message';

export default function ChatPage() {
  const {
    friendState,
    socket,
    userId,
    chatDispatch,
    chatState,
    friendDispatch,
  } = useOutletContext();
  const chatId = parseInt(useParams().chatId);
  const [loaded, setLoaded] = useState(false);
  const userName = localStorage.getItem('userName');
  const chatFriend = friendState.friends.filter((friend) => {
    return friend.id === parseInt(chatId);
  })[0];

  useEffect(() => {
    chatDispatch({ type: 'clearMessages' });
    const data = {
      sendId: userId,
      receiverId: chatId,
      sendTime: Date.now(),
      type: 'chatMessage',
    };
    if (
      !JSON.parse(localStorage.getItem('chats'))[chatId] ||
      chatFriend.notification > 0
    ) {
      //发送请求
      getMessages(data).then((res) => {
        chatDispatch({
          type: 'initMessages',
          messages: res.data,
          currentUserId: userId,
          chatUserId: chatId,
        });
        setLoaded(true);
        if (chatFriend.notification > 0) {
          friendDispatch({ type: 'removeMessageNotification', id: chatId });
        }
        const chats = JSON.parse(localStorage.getItem('chats'));
        chats[chatId] = res.data;
        localStorage.setItem('chats', JSON.stringify(chats));
        console.log(JSON.parse(localStorage.getItem('chats')));
      });
    } else {
      chatDispatch({
        type: 'initMessages',
        messages: JSON.parse(localStorage.getItem('chats'))[chatId],
        currentUserId: parseInt(userId),
        chatUserId: chatId,
      });
      setLoaded(true);
    }
  }, [chatDispatch, chatFriend.notification, chatId, friendDispatch, userId]);

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
      sendTime: Date.now(),
    };
    socket.send(JSON.stringify(data));
    chatDispatch({ type: 'addMessage', message: data, chatId: chatFriend.id });
  };

  return (
    <>
      <TopNav chatFriend={chatFriend} />
      <div className={styles.friendContainer}>
        {!loaded && <LoadChatRoomSpinner />}
        {loaded && (
          <ChatRoom
            chatFriend={chatFriend}
            socket={socket}
            userId={userId}
            userName={userName}
            messages={chatState.messages}
            sendMessage={sendMessage}
          />
        )}
        <RightSideMenu />
      </div>
    </>
  );
}
