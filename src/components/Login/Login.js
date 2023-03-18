import React, { useState, useContext } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/login';
import LoginSpinner from '../Spinner/LoginSpinner/LoginSpinner';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const onLogin = () => {
    if (password && emailOrPhone) {
      const data = {
        account: emailOrPhone,
        password,
      };
      setShowSpinner(true);
      login(data).then((res) => {
        if (res.respCode === '051') {
          userContext.userDispatch({
            type: 'init',
            init: {
              userName: res.data.name,
              userId: res.data.id,
              bannerColor: res.data.bannerColor,
              avatar: res.data.avatar,
              phone: res.data.phone,
              email: res.data.email,
              selfIntro: res.data.selfIntro,
            },
          });
          localStorage.setItem('access_token', res.data.token);
          localStorage.setItem('chats', '{}');
          navigate('/friends');
        } else {
          toast.error('Incorrect, please try again', { theme: 'colored' });
          setShowSpinner(false);
        }
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.loginHeader}>
        <h2>Welcome back!</h2>
        <p>We are so excited to see you again</p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor=''>
          EMAIL OR PHONE NUMBER <span>*</span>
        </label>
        <input
          type='text'
          onChange={(e) => {
            setEmailOrPhone(e.target.value);
          }}
        />
        <label htmlFor=''>
          PASSWORD <span>*</span>
        </label>
        <input
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Link className={styles.forgotPassword}>Forgot your password?</Link>
      <button
        className={styles.loginBtn}
        onClick={onLogin}
        disabled={showSpinner}
      >
        {showSpinner ? <LoginSpinner /> : 'Log In'}
      </button>
      <div className={styles.registerContainer}>
        <span>Need an account?</span>
        <Link to='/signup'>Register</Link>
      </div>
    </div>
  );
}
