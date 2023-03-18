import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './SettingPage.module.scss';
import MyAccount from './MyAccount/MyAccount';
import MyProfile from './MyProfile/MyProfile';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function SettingPage({ closePortal, socket }) {
  const types = [
    '我的账号',
    '个人资料',
    '隐私与安全',
    '已授权的app',
    '好友请求',
  ];
  const [current, setCurrent] = useState('我的账号');
  const [didMount, setDidMount] = useState(true);
  const navigate = useNavigate();
  const logout = () => {
    setDidMount(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('chats');
    socket.close();
    navigate('/login');
  };

  return (
    <div
      className={[
        styles.settingPageContainer,
        didMount ? styles.mount : styles.unmount,
      ].join(' ')}
    >
      <section className={styles.sideNav}>
        <ul className={styles.setting}>
          <p>用户设置</p>
          {types.map((type) => {
            return (
              <li
                className={current === type ? styles.active : ''}
                onClick={() => {
                  setCurrent(type);
                }}
                key={type}
              >
                {type}
              </li>
            );
          })}
        </ul>
        <ul className={styles.logout}>
          <li onClick={logout}>
            登出 <MdLogout className={styles.icon} />
          </li>
        </ul>
      </section>
      <section className={styles.main}>
        {current === '我的账号' && <MyAccount setCurrent={setCurrent} />}
        {current === '个人资料' && <MyProfile />}
        <button
          className={styles.exitBtn}
          onClick={() => {
            setDidMount(false);
            setTimeout(closePortal, 200);
          }}
        >
          ESC
        </button>
      </section>
    </div>
  );
}

export default function SettingPagePortal({ closePortal, socket }) {
  return (
    <>
      {ReactDOM.createPortal(
        <SettingPage closePortal={closePortal} socket={socket} />,
        document.getElementById('root')
      )}
    </>
  );
}
