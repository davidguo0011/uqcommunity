import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import styles from './IncomingCallNotification.module.scss';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { VideoContext } from '../../context/VideoContext';
import WaitingCallUI from '../WaitingCallUI/WaitingCallUI';

function IncomingCallNotification({
  setShowIncomingCallNotification,
  setShowVideo,
  friendState,
}) {
  console.log(friendState);
  const videoContext = useContext(VideoContext);
  const chatFriend = friendState.friends.filter((friend) => {
    return friend.id === parseInt(videoContext.videoState.callerId);
  })[0];
  console.log(chatFriend.avatar);
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notificationSection}>
        <WaitingCallUI avatar={chatFriend.avatar} />
        <h3>{videoContext.videoState.callerName}</h3>
        <h4>来电...</h4>
        <div className={styles.btnContainer}>
          <button
            className={styles.cancelBtn}
            onClick={() => {
              setShowIncomingCallNotification(false);
            }}
          >
            <CgClose />
          </button>
          <button
            className={styles.answerBtn}
            onClick={() => {
              setShowIncomingCallNotification(false);
              setShowVideo(true);
            }}
          >
            <BsFillTelephoneFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IncomingCallNotificationPortal({
  setShowIncomingCallNotification,
  setShowVideo,
  friendState,
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <IncomingCallNotification
          setShowIncomingCallNotification={setShowIncomingCallNotification}
          setShowVideo={setShowVideo}
          friendState={friendState}
        />,
        document.getElementById('root')
      )}
    </>
  );
}
