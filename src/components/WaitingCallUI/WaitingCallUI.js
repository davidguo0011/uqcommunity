import React from 'react';
import styles from './WaitingCallUI.module.scss';

export default function WaitingCallUI({ avatar }) {
  return (
    <div className={styles.waitingUI}>
      <div className={styles.backgroundFlash}></div>
      <img src={avatar} alt='' />
    </div>
  );
}
