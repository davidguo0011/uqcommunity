import { useEffect, useReducer } from 'react';
import { getFriends } from '../api/friends';
import { useNavigate } from 'react-router-dom';
export default function useFriendReducer() {
  const initialValue = {
    friends: [],
    initialise: false,
    loaded: false,
    notification: 0,
  };

  const reducerFunction = (state, action) => {
    const prevState = { ...state };
    switch (action.type) {
      case 'initialiseFriends':
        return { ...state, friends: action.friends, initialise: true };
      case 'loaded':
        return { ...state, loaded: true };
      case 'onlineStatus':
        action.message.data.forEach((status) => {
          prevState.friends.forEach((friend) => {
            if (status.id === friend.id) {
              friend.onlineStatus = status.status;
            }
          });
        });
        return prevState;
      case 'addFriend':
        return {
          ...state,
          friends: [
            ...state.friends,
            {
              id: action.message.sendId,
              name: action.message.sendName,
              friendship: 'wait',
              onlineStatus: 'offline',
            },
          ],
          notification: state.notification + 1,
        };
      case 'acceptFriend':
        prevState.friends.forEach((friend) => {
          if (friend.id === action.id) {
            friend.friendship = 'friend';
          }
        });
        prevState.notification--;
        return prevState;
      case 'addFriendConfirm':
        return {
          ...state,
          friends: [
            ...state.friends,
            {
              id: action.message.data.sendId,
              name: action.message.data.sendName,
              friendship: 'friend',
              onlineStatus: 'online',
            },
          ],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  useEffect(() => {
    const data = { id: userId };
    // get friends
    getFriends(data)
      .then((res) => {
        dispatch({ type: 'initialiseFriends', friends: res.data.friends });
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate, userId]);
  return [state, dispatch];
}
