import React, { useState, useContext } from 'react';
import styles from './Me.module.scss';
import { AiFillSetting } from 'react-icons/ai';
import SettingPagePortal from '../../../pages/SettingPage/SettingPage';
import { UserContext } from '../../../context/UserContext';

export default function Me({ socket }) {
  const [showSetting, setShowSetting] = useState(false);
  const userContext = useContext(UserContext);

  return (
    <div className={styles.container}>
      <img
        src={userContext.userState.avatar}
        alt='avatar'
        className={styles.avatar}
      />
      <p>
        {userContext.userState.userName}
        <span>#{userContext.userState.userId}</span>
      </p>
      <button
        onClick={() => {
          setShowSetting(true);
        }}
      >
        <AiFillSetting />
      </button>
      {showSetting && (
        <SettingPagePortal
          socket={socket}
          closePortal={() => {
            setShowSetting(false);
          }}
        />
      )}
    </div>
  );
}
