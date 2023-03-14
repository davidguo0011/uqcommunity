import React from 'react';
import styles from './PreviewProfile.module.scss';
import picInPreview from '../../../assets/picInPreview.png';

export default function PreviewProfile({
  previewPic,
  userInfo,
  seconds,
  minutes,
}) {
  return (
    <div className={styles.previewProfileContainer}>
      <div className={styles.avatarContainer}>
        <img src={previewPic} alt='' className={styles.avatar} />
        <div className={styles.onlineStatus}>
          <div className={styles.innerCircle}></div>
        </div>
      </div>
      <div
        className={styles.banner}
        style={{ backgroundColor: userInfo.bannerColor }}
      ></div>
      <div className={styles.content}>
        <div className={styles.contentContainer}>
          <h4>
            {userInfo.userName}
            <span>#{userInfo.userId}</span>
          </h4>
          <p>{userInfo.selfIntro || '自定义我的个人资料'}</p>
          <div className={styles.counterContainer}>
            <img src={picInPreview} alt='' />
            <p>
              用户个人资料
              <span>
                经过了{minutes}:{seconds}
              </span>
            </p>
          </div>
          <button className={styles.demoBtn}>示例按钮</button>
        </div>
      </div>
    </div>
  );
}
