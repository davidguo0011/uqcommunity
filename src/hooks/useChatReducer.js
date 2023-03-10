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
        const chats = JSON.parse(localStorage.getItem('chats'));
        chats[action.chatId] = [...state.messages, action.message];
        localStorage.setItem('chats', JSON.stringify(chats));
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
