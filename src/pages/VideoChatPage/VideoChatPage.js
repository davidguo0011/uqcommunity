import React, { useEffect, useRef } from 'react';
import styles from './VideoChatPage.module.scss';

export default function VideoChatPage() {
  const videoRef1 = useRef();
  const videoRef2 = useRef();

  const init = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    videoRef1.current.srcObject = localStream;
    videoRef1.current.play();
  };
  const createOffer = async () => {
    const peerConnection = new RTCPeerConnection();
    let remoteStream = new MediaStream();
    videoRef2.current.srcObject = remoteStream;
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className={styles.videoContainer}>
      <video className={styles.videoPlayer} ref={videoRef1}></video>
      <video className={styles.videoPlayer} ref={videoRef1}></video>
    </div>
  );
}
