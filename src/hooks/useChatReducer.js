import { useReducer } from 'react';

export default function useFriendReducer() {
  const initialValue = {
    messages: [],
  };

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case 'initMessages':
        return { ...state, messages: action.messages };
      case 'addMessage':
        return {
          ...state,
          messages: [...state.messages, action.message],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  return [state, dispatch];
}
