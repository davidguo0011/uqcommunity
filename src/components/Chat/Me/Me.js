import React, { useState } from 'react';
import styles from './Me.module.scss';
import { AiFillSetting } from 'react-icons/ai';
import SettingPagePortal from '../../../pages/SettingPage/SettingPage';

export default function Me({ name, avatar, setUserName, setAvatar }) {
  const [showSetting, setShowSetting] = useState(false);
  return (
    <div className={styles.container}>
      <img src={avatar} alt='avatar' className={styles.avatar} />
      <p>{name}</p>
      <button
        onClick={() => {
          setShowSetting(true);
        }}
      >
        <AiFillSetting />
      </button>
      {showSetting && (
        <SettingPagePortal
          setUserName={setUserName}
          setAvatar={setAvatar}
          closePortal={() => {
            setShowSetting(false);
          }}
        />
      )}
    </div>
  );
}
