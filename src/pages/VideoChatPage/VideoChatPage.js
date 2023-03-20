import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import styles from './VideoChatPage.module.scss';
import { UserContext } from '../../context/UserContext';
import { VideoContext } from '../../context/VideoContext';

export default function VideoChatPage({ socket }) {
  const userContext = useContext(UserContext);
  const videoContext = useContext(VideoContext);
  const chatId = parseInt(useParams().chatId);

  const [stream, setStream] = useState();

  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
  }, [socket]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream: stream,
    });
    //when initiator is true, on signal fires right away
    peer.on('signal', (data) => {
      socket.send(
        JSON.stringify({
          type: 7,
          sendId: chatId,
          receiverId: id,
          message: data,
          sendTime: Date.now(),
          sendName: userContext.userState.userName,
        })
      );
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    if (videoContext.videoState.callAccepted) {
      peer.signal(videoContext.videoState.data);
    }

    connectionRef.current = peer;
  };

  const answerCall = () => {
    videoContext.videoDispatch({ type: 'justAcceptCall' });
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream: stream,
    });
    peer.on('signal', (data) => {
      //把signal再发回给caller
      socket.send(
        JSON.stringify({
          type: 8,
          sendId: chatId,
          receiverId: videoContext.videoState.callerId,
          message: data,
          sendTime: Date.now(),
          sendName: userContext.userState.userName,
        })
      );
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(videoContext.videoState.data);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Zoomish</h1>
      <div className='container'>
        <div className='video-container'>
          {stream && (
            <video ref={myVideo} autoPlay className={styles.videoPlayer} />
          )}
          {videoContext.videoState.callAccepted && !callEnded ? (
            <video ref={userVideo} autoPlay className={styles.videoPlayer} />
          ) : null}
        </div>
      </div>
      <div className='myId'>
        <input value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
        <div className='call-button'>
          {videoContext.videoState.callAccepted && !callEnded ? (
            <button onClick={leaveCall}>End Call</button>
          ) : (
            <button onClick={() => callUser(idToCall)}>Call</button>
          )}
          {idToCall}
        </div>
      </div>
      <div>
        {videoContext.videoState.receivingCall &&
        !videoContext.videoState.callAccepted ? (
          <div className='caller'>
            <h1>{videoContext.videoState.callerName} is calling...</h1>
            <button onClick={answerCall}>Answer</button>
          </div>
        ) : null}
      </div>
    </>
  );
}
