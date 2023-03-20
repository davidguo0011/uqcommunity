import React, { useEffect, useState, useContext } from 'react';
import styles from './FriendPage.module.scss';
import { useOutletContext } from 'react-router-dom';
import FriendsStatus from '../FriendPage/FriendsStatus/FriendsStatus';
import TopNav from './TopNav/TopNav';
import RightSideMenu from '../../components/RightSideMenu/RightSideMenu';
import { UserContext } from '../../context/UserContext';

export default function FriendPage() {
  const [currentType, setCurrentType] = useState('在线');
  const { friendState, socket, friendDispatch, chatDispatch } =
    useOutletContext();
  const userContext = useContext(UserContext);

  useEffect(() => {
    chatDispatch({ type: 'clearMessages' });
    socket.send(
      JSON.stringify({
        receiverId: 0,
        sendId: userContext.userState.userId,
        type: 6,
      })
    );
  }, [chatDispatch, socket, userContext.userState.userId]);

  return (
    <>
      <TopNav
        currentType={currentType}
        setCurrentType={setCurrentType}
        friendState={friendState}
      />
      <div className={styles.friendContainer}>
        <FriendsStatus
          socket={socket}
          currentType={currentType}
          friendState={friendState}
          friendDispatch={friendDispatch}
        />
        <RightSideMenu />
      </div>
    </>
  );
}
