import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { login } from '../../api/login';
export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = () => {
    const data = {
      account: emailOrPhone,
      password,
    };
    login(data).then((res) => {
      console.log(res);
      if (res.data) {
        localStorage.setItem('access_token', res.data.token);
      }
    });
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
          type='text'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Link className={styles.forgotPassword}>Forgot your password?</Link>
      <button className={styles.loginBtn} onClick={onLogin}>
        Log In
      </button>
      <div className={styles.registerContainer}>
        <span>Need an account?</span>
        <Link to='/signup'>Register</Link>
      </div>
    </div>
  );
}
