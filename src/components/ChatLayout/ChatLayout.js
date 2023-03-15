import React, { useEffect, useState, useContext } from 'react';
import styles from './ChatLayout.module.scss';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import ChatList from '../../components/ChatList/ChatList';
import { Outlet } from 'react-router-dom';
import { initWebsocket } from '../../api/websocket';
import useFriendReducer from '../../hooks/useFriendReducer';
import { toast } from 'react-toastify';
import LoadPageSpinner from '../Spinner/LoadPageSpinner/LoadPageSpinner';
import useChatReducer from '../../hooks/useChatReducer';
import { UserContext } from '../../context/UserContext';

export default function FriendPage() {
  const [socket, setSocket] = useState();
  const userContext = useContext(UserContext);
  const [chatState, chatDispatch] = useChatReducer();
  const [friendState, friendDispatch] = useFriendReducer();
  const { initialise, loaded } = friendState;

  if (initialise && !loaded) {
    //init
    const array = [];
    friendState.friends.forEach((friend) => {
      array.push(friend.id);
    });
    const message = array.join(':');
    const data = {
      type: '1',
      sendId: userContext.userState.userId,
      sendName: userContext.userState.userName,
      message,
    };
    const ws = initWebsocket(data);
    if (friendState.friends.length === 0) {
      friendDispatch({ type: 'loaded' });
      setSocket(ws);
    } else {
      ws.onmessage = function (event) {
        var message = JSON.parse(event.data);
        if (message.wsType === 'FriendStatus') {
          friendDispatch({ type: 'loaded' });
          friendDispatch({ type: 'onlineStatus', message });
          setSocket(ws);
        }
      };
    }
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
  }, [chatDispatch, chatState, friendDispatch, loaded, socket]);

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
              chatDispatch,
              chatState,
            }}
          />
        </div>
      </>
    </div>
  );
}
