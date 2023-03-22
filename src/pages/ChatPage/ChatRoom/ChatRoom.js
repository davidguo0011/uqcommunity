import React, { useRef, useState, useContext } from 'react';
import styles from './ChatRoom.module.scss';
import ChatInput from '../../../components/Chat/ChatInput/ChatInput';
import Message from '../../../components/Chat/Message/Message';
import { useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';

export default function ChatRoom({
  chatFriend,
  messages,
  sendMessage,
  chatId,
}) {
  const userContext = useContext(UserContext);
  const scrollRef = useRef([]);
  const [firstRender, setFirstRender] = useState(true);
  const convertDate = (sendTime) => {
    const date = new Date(sendTime);
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
    return [year, month, day].join('-');
  };

  useEffect(() => {
    setFirstRender(true);
  }, [chatId]);

  useEffect(() => {
    if (firstRender) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      setFirstRender(false);
    } else {
      if (scrollRef.current.lastChild) {
        scrollRef.current.lastChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [messages, firstRender]);

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.chatHeader}>
        <img src={chatFriend.avatar} alt='' />
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
                  message.sendId === userContext.userState.userId
                    ? userContext.userState.userName
                    : chatFriend.name
                }
                avatar={
                  message.sendId === userContext.userState.userId
                    ? userContext.userState.avatar
                    : chatFriend.avatar
                }
                message={message.message}
                reverse={message.sendId === userContext.userState.userId}
                dateTime={convertDate(message.sendTime)}
                key={message.messageId}
              />
            );
          })}
      </div>
      <ChatInput chatFriend={chatFriend} sendMessage={sendMessage} />
    </div>
  );
}
