import React, { useRef } from 'react';
import styles from './ChatRoom.module.scss';
import avatar from '../../../assets/discord.png';
import ChatInput from '../../../components/Chat/ChatInput/ChatInput';
import Message from '../../../components/Chat/Message/Message';
import { useEffect } from 'react';

export default function ChatRoom({
  chatFriend,
  userId,
  messages,
  sendMessage,
  userName,
}) {
  const scrollRef = useRef([]);
  const convertDate = (sendTime) => {
    const date = new Date(sendTime);
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
    return [year, month, day].join('-');
  };
  useEffect(() => {
    scrollRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [messages]);
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
      <div className={styles.chatArea} ref={scrollRef}>
        {messages
          .sort((a, b) => (a.sendTime > b.sendTime ? 1 : -1))
          .map((message) => {
            return (
              <Message
                chatName={
                  message.sendId === userId ? userName : chatFriend.name
                }
                message={message.message}
                reverse={message.sendId === userId}
                dateTime={convertDate(message.sendTime)}
                key={message.sendTime}
                ref={(element) => scrollRef.current.push(element)}
              />
            );
          })}
      </div>
      <ChatInput chatFriend={chatFriend} sendMessage={sendMessage} />
    </div>
  );
}
