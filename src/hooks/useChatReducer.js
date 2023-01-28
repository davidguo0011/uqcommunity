import { useEffect, useReducer } from 'react';
import { getFriends } from '../api/friends';
import { useNavigate } from 'react-router-dom';
export default function useFriendReducer() {
  const initialValue = {
    messages: [],
  };

  const reducerFunction = (state, action) => {
    const prevState = { ...state };
    switch (action.type) {
      case 'updateMessagesFriends':
        action.friends.forEach((friend) => {
          prevState.messages.push({friend['id']:[]});
        });
        return {};
      case 'addMessage':
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
