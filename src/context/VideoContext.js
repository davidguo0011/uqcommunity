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
  };
  //reducer function
  const userReducer = (state, action) => {
    switch (action.type) {
      case 'callUser':
        return {
          ...state,
          receivingCall: true,
          callerId: action.message.sendId,
          callerName: action.message.sendName,
          data: action.message.message,
        };
      case 'callAccepted':
        return {
          ...state,
          data: action.message.message,
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
