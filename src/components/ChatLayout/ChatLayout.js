import React, { useEffect, useState } from 'react';
import styles from './ChatLayout.module.scss';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import ChatList from '../../components/ChatList/ChatList';
import { Outlet } from 'react-router-dom';
import { initWebsocket } from '../../api/websocket';
import useFriendReducer from '../../hooks/useFriendReducer';
import { toast } from 'react-toastify';
import LoadPageSpinner from '../Spinner/LoadPageSpinner/LoadPageSpinner';
import useChatReducer from '../../hooks/useChatReducer';

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
  const userId = parseInt(localStorage.getItem('userId'));
  const userName = localStorage.getItem('userName');
  const [chatState, chatDispatch] = useChatReducer();
  //{"id":6,"name":"David","age":0,"password":null,"account":null,"gender":0,"email":null,"friendship":"friend"},{"id":7,"name":"david","age":0,"password":null,"account":null,"gender":0,"email":null,"friendship":"friend"}
  const [friendState, friendDispatch] = useFriendReducer();
  const { initialise, loaded } = friendState;

  if (initialise && !loaded) {
    //init
    const array = [];
    friendState.friends.forEach((friend) => {
      array.push(friend.id);
    });
    const message = array.join(':');
    const data = { type: '1', sendId: userId, sendName: userName, message };
    const ws = initWebsocket(data);
    setSocket(ws);
    friendDispatch({ type: 'loaded' });

    //listen to websocket
  }
  useEffect(() => {
    if (socket) {
      socket.onmessage = function (event) {
        var message = JSON.parse(event.data);
        console.log(message);
        if (message.wsType === 'FriendStatus') {
          friendDispatch({ type: 'onlineStatus', message });
        } else if (message.message === 'addFriend') {
          friendDispatch({ type: 'addFriend', message });
        } else if (message.wsType === 'FriendReqAccept') {
          toast.success('A friend has accepted your request!', {
            theme: 'colored',
          });
          friendDispatch({ type: 'addFriendConfirm', message });
        } else if (message.wsType === 'chatMessage') {
          console.log(chatState);
          console.log(message.data.sendId);
          if (chatState.chatUserId !== message.data.sendId) {
            friendDispatch({ type: 'messageNotification', message });
          } else {
            chatDispatch({
              type: 'addMessage',
              message: message.data,
              chatId: chatState.chatUserId,
            });
          }
        }
      };
    }
  }, [chatDispatch, chatState, friendDispatch, socket]);

  if (!initialise || !loaded) {
    return <LoadPageSpinner />;
  }

  return (
    <div className={styles.friendPageContainer}>
      <SideNavigation />
      <>
        <ChatList
          friendState={friendState}
          socket={socket}
          friendDispatch={friendDispatch}
        />
        <div className={styles.rightSection}>
          <Outlet
            context={{
              friendState,
              socket,
              friendDispatch,
              userId,
              chatDispatch,
              chatState,
            }}
          />
        </div>
      </>
    </div>
  );
}
