import React from 'react';
import styles from './ChatRoom.module.scss';
import avatar from '../../../assets/discord.png';
import ChatInput from '../../../components/Chat/ChatInput/ChatInput';
import Message from '../../../components/Chat/Message/Message';
import { useEffect } from 'react';

export default function ChatRoom({ chatFriend, socket, userId }) {
  const dummyMessage = [
    { id: '1', messageid: '1', message: '我真帅' },
    { id: '9', messageid: '2', message: '有道理有道理' },
    { id: '1', messageid: '3', message: '帅在哪' },
    { id: '9', messageid: '4', message: '哪都帅' },
  ];
  // const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  console.log(userId);
  useEffect(() => {
    console.log('render');
  }, [chatFriend]);

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.chatHeader}>
        <img src={avatar} alt='' />
        <h2>{chatFriend.name}</h2>
        <div className={styles.buttonContainer}>
          <button>删除好友</button>
          <button>屏蔽</button>
        </div>
      </div>
      <div className={styles.chatArea}>
        {dummyMessage.map((message) => {
          return (
            <Message
              chatName={message.id === userId ? userName : chatFriend.name}
              message={message.message}
              reverse={message.id === userId}
              dateTime='今天 12:00'
              key={message.messageid}
            />
          );
        })}
      </div>
      <ChatInput chatFriend={chatFriend} />
    </div>
  );
}
