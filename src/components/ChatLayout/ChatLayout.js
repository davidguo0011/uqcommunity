import React, { useState } from 'react';
import styles from './ChatLayout.module.scss';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import ChatList from '../../components/ChatList/ChatList';
import { Outlet } from 'react-router-dom';
import { initWebsocket } from '../../api/websocket';
import useFriendReducer from '../../hooks/useFriendReducer';
import { toast } from 'react-toastify';
import LoadPageSpinner from '../Spinner/LoadPageSpinner/LoadPageSpinner';

export default function FriendPage() {
  // const dummyFriendList = [
  //   { id: '1', name: 'haoxuan', onlineStatus: 'online', friendship: 'friend' },
  //   { id: '3', name: 'eileen', onlineStatus: 'online', friendship: 'friend' },
  //   { id: '5', name: 'wendy', onlineStatus: 'online', friendship: 'friend' },
  //   { id: '6', name: 'hihi', onlineStatus: 'online', friendship: 'block' },
  //   { id: '7', name: 'john', onlineStatus: 'offline', friendship: 'friend' },
  //   { id: '8', name: 'ben', onlineStatus: 'offline', friendship: 'wait' },
  // ];
  const [socket, setSocket] = useState();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  //{"id":6,"name":"David","age":0,"password":null,"account":null,"gender":0,"email":null,"friendship":"friend"},{"id":7,"name":"david","age":0,"password":null,"account":null,"gender":0,"email":null,"friendship":"friend"}
  const [friendState, friendDispatch] = useFriendReducer();
  const { initialise, loaded } = friendState;
  if (initialise && !loaded) {
    if (friendState.friends.length === 0) {
      friendDispatch({ type: 'loaded' });
    }
    const array = [];
    friendState.friends.forEach((friend) => {
      array.push(friend.id);
    });
    const message = array.join(':');
    const data = { type: '1', sendId: userId, sendName: userName, message };
    const ws = initWebsocket(data);
    ws.onmessage = function (event) {
      var message = JSON.parse(event.data);
      console.log(message);
      if (message.wsType === 'FriendStatus') {
        if (!loaded) {
          friendDispatch({ type: 'loaded' });
          setSocket(ws);
        }
        friendDispatch({ type: 'onlineStatus', message });
      } else if (message.message === 'addFriend') {
        friendDispatch({ type: 'addFriend', message });
      } else if (message.wsType === 'FriendReqAccept') {
        toast.success('A friend has accepted your request!', {
          theme: 'colored',
        });
        friendDispatch({ type: 'addFriendConfirm', message });
      }
    };
  }

  if (!initialise || !loaded) {
    return <LoadPageSpinner />;
  }

  return (
    <div className={styles.friendPageContainer}>
      <SideNavigation />
      <>
        <ChatList friendState={friendState} socket={socket} />
        <div className={styles.rightSection}>
          <Outlet context={{ friendState, socket, friendDispatch, userId }} />
        </div>
      </>
    </div>
  );
}
