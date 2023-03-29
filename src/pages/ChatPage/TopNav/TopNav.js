import React, { useContext } from 'react';
import styles from './TopNav.module.scss';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { queryUserVideoChatStatus } from '../../../api/videoChat';
import { UserContext } from '../../../context/UserContext';
import { toast } from 'react-toastify';

export default function TopNav({ chatFriend, setShowVideo }) {
  const userContext = useContext(UserContext);
  return (
    <div className={styles.topNavContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.header}>
          <span>
            <BsFillChatDotsFill />
          </span>
          <div className={styles.chatName}>{chatFriend.name}</div>
        </div>
        <div className={styles.btnContainer}>
          {chatFriend.onlineStatus === 'online' && (
            <button
              onClick={() => {
                const data = {
                  type: 10,
                  sendId: userContext.userState.userId,
                  receiverId: chatFriend.id,
                  sendTime: Date.now(),
                };
                queryUserVideoChatStatus(data).then((res) => {
                  if (res.data.isBusy === 0) {
                    setShowVideo(true);
                  } else if (res.data.isBusy === 1) {
                    toast.warning('User is busy, please call later', {
                      theme: 'colored',
                    });
                  } else if (res.data.isBusy === 2) {
                    toast.error('OOps connection failed', { theme: 'colored' });
                  }
                });
              }}
            >
              <BsFillTelephoneFill />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
