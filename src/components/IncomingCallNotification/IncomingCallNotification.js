import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './IncomingCallNotification.module.scss';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { VideoContext } from '../../context/VideoContext';
import WaitingCallUI from '../WaitingCallUI/WaitingCallUI';
import Ring from '../../assets/ringtone-126505.mp3';
import useSound from 'use-sound';
import { UserContext } from '../../context/UserContext';

function IncomingCallNotification({
  setShowIncomingCallNotification,
  setShowVideo,
  friendState,
  socket,
}) {
  const videoContext = useContext(VideoContext);
  const userContext = useContext(UserContext);
  const chatFriend = friendState.friends.filter((friend) => {
    return friend.id === parseInt(videoContext.videoState.callerId);
  })[0];
  const [didMount, setDidMount] = useState(true);
  const [play, { stop }] = useSound(Ring);
  useEffect(() => {
    play();
    return () => {
      stop();
    };
  }, [play, stop]);

  useEffect(() => {
    if (videoContext.videoState.callEnded) {
      setShowIncomingCallNotification(false);
      videoContext.videoDispatch({ type: 'clear' });
    }
  }, [
    setShowIncomingCallNotification,
    videoContext,
    videoContext.videoState.callEnded,
  ]);

  return (
    <div
      className={[
        styles.notificationContainer,
        didMount ? styles.mount : styles.unmount,
      ].join(' ')}
    >
      <div className={styles.notificationSection}>
        <WaitingCallUI avatar={chatFriend.avatar} />
        <h3>{videoContext.videoState.callerName}</h3>
        <h4>来电...</h4>
        <div className={styles.btnContainer}>
          <button
            className={styles.cancelBtn}
            onClick={() => {
              const data = {
                type: '11',
                sendId: userContext.userState.userId,
                receiverId: videoContext.videoState.callerId,
                sendTime: Date.now(),
              };
              socket.send(JSON.stringify(data));
              setDidMount(false);
              setTimeout(() => {
                setShowIncomingCallNotification(false);
                videoContext.videoDispatch({ type: 'clear' });
              }, 200);
            }}
          >
            <CgClose />
          </button>
          <button
            className={styles.answerBtn}
            onClick={() => {
              setDidMount(false);
              setTimeout(() => {
                setShowIncomingCallNotification(false);
                setShowVideo(true);
              }, 200);
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
  socket,
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <IncomingCallNotification
          setShowIncomingCallNotification={setShowIncomingCallNotification}
          setShowVideo={setShowVideo}
          friendState={friendState}
          socket={socket}
        />,
        document.getElementById('root')
      )}
    </>
  );
}
