import React, { useState } from 'react';
import styles from './MyAccountProfile.module.scss';
import EditSettingPortal from '../EditSetting/EditSetting';
import { useEffect } from 'react';

export default function MyAccountProfile({ setCurrent, setUserName }) {
  const [showEditSetting, setShowEditSetting] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const data = [
    {
      header: '输入用户名',
      description: '输入新用户名和现有密码。',
      label: '用户名',
    },
    {
      header: '输入电子邮箱地址',
      description: '输入新的电子邮箱地址和现有密码。',
      label: '电子邮箱',
    },
    {
      header: '输入手机号码',
      description: '输入新手机号码和现有密码。',
      label: '手机号码',
    },
  ];

  useEffect(() => {
    setUserInfo({
      userName: localStorage.getItem('userName'),
      email: localStorage.getItem('email'),
      userId: localStorage.getItem('userId'),
      bannerColor: localStorage.getItem('bannerColor'),
      avatar: localStorage.getItem('avatar'),
      phone: localStorage.getItem('phone'),
    });
  }, []);

  return (
    <div className={styles.myAccountProfileContainer}>
      {showEditSetting && (
        <EditSettingPortal
          setShowEditSetting={setShowEditSetting}
          header={currentEdit.header}
          description={currentEdit.description}
          label={currentEdit.label}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setUserName={setUserName}
        />
      )}
      <div
        className={styles.banner}
        style={{ backgroundColor: userInfo.bannerColor }}
      ></div>
      <div className={styles.mainBody}>
        <section className={styles.info}>
          <img src={userInfo.avatar} alt='' />
          <p>
            {userInfo.userName}
            <span>#{userInfo.userId}</span>
          </p>
          <button
            onClick={() => {
              setCurrent('个人资料');
            }}
          >
            编辑用户个人资料
          </button>
        </section>
        <section className={styles.edit}>
          <div className={styles.editContainer}>
            {data.map((item) => {
              let content = null;
              if (item.label === '用户名') {
                content = `${userInfo.userName}#${userInfo.userId}`;
              } else if (item.label === '电子邮箱') {
                content = userInfo.email;
              } else {
                content = userInfo.phone;
              }
              return (
                <div className={styles.editItem} key={item.label}>
                  <div>
                    <p className={styles.label}>{item.label}</p>
                    <p>{content}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowEditSetting(true);
                      setCurrentEdit(item);
                    }}
                  >
                    编辑
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
