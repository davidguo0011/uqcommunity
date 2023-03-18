import React, { useState } from 'react';
import styles from './Signup.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../api/signup';
import LoginSpinner from '../Spinner/LoginSpinner/LoginSpinner';
import { toast } from 'react-toastify';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const onSignup = () => {
    const data = {
      email,
      account: email,
      password,
      name: username,
    };
    setShowSpinner(true);
    signup(data).then((res) => {
      if (res.respCode === '051') {
        toast.success('Signup successful, please login!', { theme: 'colored' });
        navigate('/login');
      }
    });
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.signupHeader}>
        <h2>Create an account</h2>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor=''>EMAIL</label>
        <input
          type='text'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor=''>USERNAME</label>
        <input
          type='text'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor=''>PASSWORD</label>
        <input
          type='text'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button className={styles.signupBtn} onClick={onSignup}>
        {showSpinner ? <LoginSpinner /> : 'Continue'}
      </button>
      <div className={styles.registerContainer}>
        <Link to='/login'>Already have an account?</Link>
      </div>
    </div>
  );
}
