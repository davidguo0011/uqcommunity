import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ChatPage.module.scss';
import SideNavigation from '../../components/SideNavigation/SideNavigation';
import ChatList from '../../components/ChatList/ChatList';
import ChatRoom from './ChatRoom/ChatRoom';
import FriendsStatus from '../FriendPage/FriendsStatus/FriendsStatus';
import { getFriends } from '../../api/friends';
import { initWebsocket } from '../../api/websocket';
import TopNav from './TopNav/TopNav';
import RightSideMenu from '../../components/RightSideMenu/RightSideMenu';

export default function ChatPage() {
  const dummyFriendList = [
    { id: '1', name: 'haoxuan', onlineStatus: 'online', friendShip: 'friend' },
    { id: '3', name: 'eileen', onlineStatus: 'online', friendShip: 'friend' },
    { id: '5', name: 'wendy', onlineStatus: 'online', friendShip: 'friend' },
    { id: '6', name: 'hihi', onlineStatus: 'online', friendShip: 'block' },
    { id: '7', name: 'john', onlineStatus: 'offline', friendShip: 'friend' },
    { id: '8', name: 'ben', onlineStatus: 'offline', friendShip: 'wait' },
  ];
  const { chatId } = useParams();
  const chatFriend = dummyFriendList.filter((friend) => {
    return friend.id === chatId;
  })[0];
  console.log(chatFriend);
  const [friends, setFriends] = useState(dummyFriendList);
  const [socket, setSocket] = useState();

  //const data = {
  //   type: 2,
  //   sendId,
  //   sendName: localStorage.getItem('userName'),
  //   receiverId,
  //   receiverName,
  //   message: 'addFriend',
  //   messageId: `${Date.now()}:${sendId}:${receiverId}:${randomSixDigits}`,
  // };

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const handleMessage = (message) => {
    // if (message.type === 2) {
    //   const newFriends = [
    //     ...friends,
    //     {
    //       id: message.sendId,
    //       name: message.sendName,
    //       onlineStatus: 'online',
    //       friendShip: 'wait',
    //     },
    //   ];
    //   console.log(newFriends);
    //   setFriends(newFriends);
    // }
  };

  useEffect(() => {
    // const data = { id: userId };
    //create new websocket
    const socket = initWebsocket();
    setSocket(socket);
    socket.onmessage = function (event) {
      var message = event.data;
      handleMessage(JSON.parse(message));
    };
    // get friends
    // getFriends(data)
    //   .then((res) => {
    //     console.log(res.data.friends);
    //     setFriends(res.data.friends);
    //   })
    //   .catch(() => {
    //     navigate('/login');
    //   });
  }, [navigate, userId]);

  return (
    <div className={styles.chatPageContainer}>
      <SideNavigation />
      <ChatList friends={friends} />
      <div className={styles.rightSection}>
        <TopNav chatFriend={chatFriend} />
        <div className={styles.friendContainer}>
          <ChatRoom chatFriend={chatFriend} socket={socket} userId={userId} />
          <RightSideMenu />
        </div>
      </div>
    </div>
  );
}
