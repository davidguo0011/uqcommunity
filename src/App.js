import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ChatPage from './pages/ChatPage/ChatPage';
import FriendPage from './pages/FriendPage/FriendPage';
import ChatLayout from './components/ChatLayout/ChatLayout';
import VideoChatPage from './pages/VideoChatPage/VideoChatPage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <ToastContainer style={{ width: '400px' }} />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/' element={<ChatLayout />}>
            <Route path='/chat/:chatId' element={<ChatPage />} />
            <Route path='/friends' element={<FriendPage />} />
          </Route>
          <Route path='/video/:chatId' element={<VideoChatPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
