import React, { useReducer } from 'react';
export const UserContext = React.createContext();

export const UserProvider = (props) => {
  //reducer function
  const userReducer = (state, action) => {
    switch (action.type) {
      case 'init':
        return { ...action.init };
      case 'changeUserName':
        return { ...state, userName: action.userName };
      case 'changeBannerColor':
        return { ...state, bannerColor: action.bannerColor };
      case 'changeAvatar':
        return { ...state, avatar: action.avatar };
      case 'changePhone':
        return { ...state, phone: action.phone };
      case 'changeEmail':
        return { ...state, email: action.email };
      case 'changeSelfIntro':
        return { ...state, selfIntro: action.selfIntro };
      default:
        return state;
    }
  };
  //initial state
  const initialState = {
    userName: '',
    userId: null,
    bannerColor: '',
    avatar: '',
    phone: '',
    email: '',
    selfIntro: '',
  };

  const [userState, userDispatch] = useReducer(userReducer, initialState);

  const userContext = {
    userState,
    userDispatch,
  };
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};
