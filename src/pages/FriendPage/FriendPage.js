import React, { useState } from 'react';
import styles from './FriendPage.module.scss';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import ChatList from '../../components/ChatList/ChatList';
import FriendsStatus from '../FriendPage/FriendsStatus/FriendsStatus';
import TopNav from './TopNav/TopNav';
import RightSideMenu from '../../components/RightSideMenu/RightSideMenu';

export default function FriendPage() {
  const dummyFriendList = [
    { id: '1', name: 'david', onlineStatus: 'online', friendShip: 'friend' },
    { id: '3', name: 'eileen', onlineStatus: 'online', friendShip: 'friend' },
    { id: '5', name: 'wendy', onlineStatus: 'online', friendShip: 'friend' },
    { id: '6', name: 'hihi', onlineStatus: 'online', friendShip: 'block' },
    { id: '7', name: 'john', onlineStatus: 'offline', friendShip: 'friend' },
  ];
  const [friends, setFriends] = useState(dummyFriendList);
  const [currentType, setCurrentType] = useState('在线');

  return (
    <div className={styles.friendPageContainer}>
      <SideNavigation />
      <ChatList friends={friends} />
      <div className={styles.rightSection}>
        <TopNav currentType={currentType} setCurrentType={setCurrentType} />
        <div className={styles.friendContainer}>
          <FriendsStatus friends={friends} currentType={currentType} />
          <RightSideMenu />
        </div>
      </div>
    </div>
  );
}
