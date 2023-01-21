import React from 'react';
import styles from './ChatRoom.module.scss';
import TopNavChat from '../TopNavChat/TopNavChat';
import avatar from '../../../assets/discord.png';
import ChatInput from '../../../components/Chat/ChatInput/ChatInput';
import Message from '../../../components/Chat/Message/Message';

export default function ChatRoom({ chatName }) {
  return (
    <>
      <TopNavChat chatName={chatName} />
      <div className={styles.chatRoomContainer}>
        <div className={styles.chatHeader}>
          <img src={avatar} alt='' />
          <h2>{chatName}</h2>
          <div className={styles.buttonContainer}>
            <button>删除好友</button>
            <button>屏蔽</button>
          </div>
        </div>
        <div className={styles.chatArea}>
          <Message chatName={chatName} reverse={false} />
          <Message chatName={chatName} reverse={false} />

          <Message chatName={chatName} reverse />
          <Message chatName={chatName} reverse />
          <Message chatName={chatName} reverse={false} />
          <Message chatName={chatName} reverse={false} />
          <Message chatName={chatName} reverse />
          <Message chatName={chatName} reverse />
        </div>
        <ChatInput chatName={chatName} />
      </div>
    </>
  );
}
