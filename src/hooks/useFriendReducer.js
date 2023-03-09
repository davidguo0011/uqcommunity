import { useEffect, useReducer } from 'react';
import { getFriends } from '../api/friends';
import { useNavigate } from 'react-router-dom';
export default function useFriendReducer() {
  const initialValue = {
    friends: [],
    initialise: false,
    loaded: false,
    addFriendNotification: 0,
  };

  const reducerFunction = (state, action) => {
    const prevState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case 'initialiseFriends':
        let addFriendNotification = 0;
        const friends = action.friends.map((friend) => {
          if (friend.friendship === 'wait') {
            addFriendNotification += 1;
          }
          return friend;
        });
        return {
          ...state,
          friends: friends,
          initialise: true,
          addFriendNotification,
        };
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
          addFriendNotification: state.addFriendNotification + 1,
        };
      case 'acceptFriend':
        prevState.friends.forEach((friend) => {
          if (friend.id === action.id) {
            friend.friendship = 'friend';
          }
        });
        prevState.addFriendNotification--;
        return prevState;
      case 'denyFriend':
        prevState.friends = prevState.friends.filter((friend) => {
          return friend.id !== action.id;
        });
        prevState.addFriendNotification--;
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
      case 'messageNotification':
        prevState.friends.forEach((friend) => {
          if (action.message.data.sendId === friend.id) {
            friend.notification = friend.notification + 1;
          }
        });
        return prevState;
      case 'removeMessageNotification':
        prevState.friends.forEach((friend) => {
          if (action.id === friend.id) {
            friend.notification = 0;
          }
        });
        return prevState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  useEffect(() => {
    const data = { id: userId };
    if (!state.initialise) {
      getFriends(data)
        .then((res) => {
          console.log(JSON.parse(JSON.stringify(res.data.friends)));

          dispatch({
            type: 'initialiseFriends',
            friends: JSON.parse(JSON.stringify(res.data.friends)),
          });
        })
        .catch(() => {
          navigate('/login');
        });
    }
  }, [navigate, state.initialise, userId]);

  return [state, dispatch];
}
