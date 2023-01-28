import React from 'react';
import styles from './ChatRoom.module.scss';
import avatar from '../../../assets/discord.png';
import ChatInput from '../../../components/Chat/ChatInput/ChatInput';
import Message from '../../../components/Chat/Message/Message';

export default function ChatRoom({
  chatFriend,
  userId,
  messages,
  sendMessage,
  userName,
}) {
  const convertDate = (messageId) => {
    const unixTime = messageId.split(':')[0];
    const date = new Date(parseInt(unixTime));
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
    return [year, month, day].join('-');
  };
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
        {messages.map((message) => {
          return (
            <Message
              chatName={message.sendId === userId ? userName : chatFriend.name}
              message={message.message}
              reverse={message.sendId === userId}
              dateTime={convertDate(message.messageId)}
              key={message.messageid}
            />
          );
        })}
      </div>
      <ChatInput chatFriend={chatFriend} sendMessage={sendMessage} />
    </div>
  );
}
