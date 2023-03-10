import React from 'react';
import styles from './Me.module.scss';
import avatar from '../../../assets/avatar.png';
import { AiFillSetting } from 'react-icons/ai';

export default function Friend({ name }) {
  return (
    <div className={styles.container}>
      <img src={avatar} alt='avatar' className={styles.avatar} />
      <p>{name}</p>
      <button>
        <AiFillSetting />
      </button>
    </div>
  );
}
