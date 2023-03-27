import React from 'react';
import styles from './RightSideMenu.module.scss';
export default function RightSideMenu({ onlineStatus, disable, chatFriend }) {
  const onlineStatusList = {
    online: styles.online,
    offline: styles.offline,
  };
  return (
    <div className={styles.rightSideMenuContainer}>
      {!disable && (
        <>
          {' '}
          <div
            className={styles.banner}
            style={{ backgroundColor: chatFriend.bannerColor }}
          ></div>
          <div className={styles.imgContainer}>
            <img src={chatFriend.avatar} alt='' />
            <div className={styles.outer}>
              <div
                className={[
                  styles.middle,
                  onlineStatusList[chatFriend.onlineStatus],
                ].join(' ')}
              >
                <div className={styles.inner}></div>
              </div>
            </div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.content}>
              <h3>
                {chatFriend.name} <span>#{chatFriend.id}</span>
              </h3>
              <div className={styles.split}></div>
              <div className={styles.description}>
                <h4>自我介绍</h4>
                <span>{chatFriend.selfIntro}</span>
              </div>
              <div className={styles.description}>
                <h4>成员注册时间</h4>
                <span>11月29日，2020</span>
              </div>

              <div className={styles.split}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
