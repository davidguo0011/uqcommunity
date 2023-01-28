import React, { useState } from 'react';
import styles from './FriendPage.module.scss';
import { useOutletContext } from 'react-router-dom';
import FriendsStatus from '../FriendPage/FriendsStatus/FriendsStatus';
import TopNav from './TopNav/TopNav';
import RightSideMenu from '../../components/RightSideMenu/RightSideMenu';

export default function FriendPage() {
  const [currentType, setCurrentType] = useState('在线');
  const { friendState, socket, friendDispatch, userId } = useOutletContext();
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
