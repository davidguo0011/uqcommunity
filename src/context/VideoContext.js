import React, { useReducer } from 'react';
export const VideoContext = React.createContext();

export const VideoProvider = (props) => {
  const initialState = {
    data: {},
    receivingCall: false,
    callerName: '',
    callerId: 0,
    callAccepted: false,
    peer: {},
    callEnded: false,
  };
  //reducer function
  const userReducer = (state, action) => {
    switch (action.type) {
      case 'callUser':
        return {
          ...state,
          receivingCall: true,
          callerId: action.message.data.sendId,
          callerName: action.message.data.sendName,
          data: action.message.data.message,
        };
      case 'callAccepted':
        return {
          ...state,
          data: action.message.data.message,
          callAccepted: true,
        };
      case 'justAcceptCall':
        return {
          ...state,
          callAccepted: true,
        };
      case 'clear':
        return initialState;
      case 'setPeerOnCall':
        return {
          ...state,
          peer: action.peer,
        };
      case 'endCall':
        return {
          ...state,
          callEnded: true,
        };
      default:
        return state;
    }
  };
  //initial state

  const [videoState, videoDispatch] = useReducer(userReducer, initialState);

  const videoContext = {
    videoState,
    videoDispatch,
  };
  return (
    <VideoContext.Provider value={videoContext}>
      {props.children}
    </VideoContext.Provider>
  );
};
