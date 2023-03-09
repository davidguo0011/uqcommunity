import { useReducer } from 'react';

export default function useChatReducer() {
  const initialValue = {
    currentUserId: '',
    chatUserId: '',
    messages: [],
  };

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case 'initMessages':
        return {
          ...state,
          messages: action.messages,
          currentUserId: action.currentUserId,
          chatUserId: action.chatUserId,
        };
      case 'addMessage':
        localStorage.setItem(
          action.chatId,
          JSON.stringify([...state.messages, action.message])
        );
        return {
          ...state,
          messages: [...state.messages, action.message],
        };
      case 'clearMessages':
        return initialValue;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  return [state, dispatch];
}
