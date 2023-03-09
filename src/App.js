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
import { GlobalScrollbar } from 'mac-scrollbar';

function App() {
  return (
    <>
      <GlobalScrollbar />
      <ToastContainer style={{ width: '400px' }} />{' '}
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/' element={<ChatLayout />}>
            <Route path='/chat/:chatId' element={<ChatPage />} />{' '}
            <Route path='/friends' element={<FriendPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
