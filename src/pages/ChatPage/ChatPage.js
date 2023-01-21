import React, { useState } from 'react';
import styles from './ChatPage.module.scss';
import SideNavigation from './SideNavigation/SideNavigation';
import ChatList from './ChatList/ChatList';
import ChatRoom from './ChatRoom/ChatRoom';
import Friends from './Friends/Friends';

export default function ChatPage() {
  const [status, setStatus] = useState('friends');
  const [chatName, setChatName] = useState('');
  const friendListDummy = [
    { id: '1', name: 'Ziqi' },
    { id: '2', name: 'Eileen' },
    { id: '3', name: 'David' },
  ];

  return (
    <div className={styles.chatPageContainer}>
      <SideNavigation />
      <ChatList
        setStatus={setStatus}
        setChatName={setChatName}
        friendListDummy={friendListDummy}
      />
      <div className={styles.rightSection}>
        {status === 'chat' && <ChatRoom chatName={chatName} />}
        {status === 'friends' && <Friends />}
      </div>
    </div>
  );
}
