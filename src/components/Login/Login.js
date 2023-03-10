import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/login';
import LoginSpinner from '../Spinner/LoginSpinner/LoginSpinner';
export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onLogin = () => {
    if (password && emailOrPhone) {
      const data = {
        account: emailOrPhone,
        password,
      };
      setShowSpinner(true);
      login(data).then((res) => {
        if (res.respCode === '051') {
          localStorage.setItem('userName', res.data.name);
          localStorage.setItem('access_token', res.data.token);
          localStorage.setItem('userId', res.data.id);
          localStorage.setItem('chats', '{}');
          navigate('/friends');
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
