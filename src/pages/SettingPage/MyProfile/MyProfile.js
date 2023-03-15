import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './MyProfile.module.scss';
import PreviewProfile from '../PreviewProfile/PreviewProfile';
import SaveProfileChanges from '../SaveProfileChanges/SaveProfileChanges';
import { updateUserAvatar, updateUserInfo } from '../../../api/user';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';

export default function MyProfile() {
  const userContext = useContext(UserContext);
  const data = {
    userName: userContext.userState.userName,
    email: userContext.userState.email,
    userId: userContext.userState.userId,
    bannerColor: userContext.userState.bannerColor,
    avatar: userContext.userState.avatar,
    phone: userContext.userState.phone,
    selfIntro: userContext.userState.selfIntro,
  };
  const [originalUserInfo, setOriginalUserInfo] = useState(data);
  const [userInfo, setUserInfo] = useState(data);
  const [profileChange, setProfileChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveChangesMount, setSaveChangesMount] = useState(false);
  const [previewPic, setPreviewPic] = useState(userContext.userState.avatar);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const inputFile = useRef(null);

  useEffect(() => {
    const counter = setInterval(() => {
      if (seconds < 60) {
        setSeconds((prev) => {
          return prev + 1;
        });
      } else {
        setSeconds(0);
        setMinutes((prev) => {
          return prev + 1;
        });
      }
    }, 1000);
    return () => clearInterval(counter);
  }, [seconds]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const showChanges = () => {
    setProfileChange(true);
    setSaveChangesMount(true);
  };
  const hideChanges = () => {
    setSaveChangesMount(false);
    setTimeout(() => {
      setProfileChange(false);
    }, 200);
  };
  const reset = () => {
    setUserInfo({ ...originalUserInfo });
    setPreviewPic(userContext.userState.avatar);
    inputFile.current.value = '';
    hideChanges();
  };
  const saveChanges = async () => {
    let avatarChanged = false;
    let userInfoChanged = false;
    setLoading(true);
    if (userInfo.avatar !== originalUserInfo.avatar) {
      avatarChanged = true;
      const base64full = await convertToBase64(userInfo.avatar);
      const base64 = base64full.split(',')[1];
      const type = userInfo.avatar.type.split('/')[1];
      const data = {
        userId: userInfo.userId,
        base64Img: base64,
        suffix: type,
      };
      const res = await updateUserAvatar(data);
      if (res.respCode === '051') {
        toast.success('Profile picture is sucessfully changed!', {
          theme: 'colored',
        });
        avatarChanged = false;
        userContext.userDispatch({ type: 'changeAvatar', avatar: res.data });
      } else {
        toast.error('Something went wrong!', { theme: 'colored' });
      }
    }
    if (
      userInfo.bannerColor !== originalUserInfo.bannerColor ||
      userInfo.selfIntro !== originalUserInfo.selfIntro
    ) {
      userInfoChanged = true;
      let data = {
        id: userInfo.userId,
        bannerColor: userInfo.bannerColor,
        selfIntro: userInfo.selfIntro,
      };
      const res = await updateUserInfo(data);
      if (res.respCode === '051') {
        toast.success('Profile is sucessfully changed!', {
          theme: 'colored',
        });
        userInfoChanged = false;
        userContext.userDispatch({
          type: 'changeBannerColor',
          bannerColor: userInfo.bannerColor,
        });
        userContext.userDispatch({
          type: 'changeSelfIntro',
          selfIntro: userInfo.selfIntro,
        });
      } else {
        toast.error('Something went wrong!', { theme: 'colored' });
      }
    }
    if (!userInfoChanged && !avatarChanged) {
      setOriginalUserInfo({ ...userInfo });
      setLoading(false);
      hideChanges();
    }
  };

  useEffect(() => {
    if (userInfo && originalUserInfo) {
      if (
        userInfo.avatar !== originalUserInfo.avatar ||
        userInfo.bannerColor !== originalUserInfo.bannerColor ||
        userInfo.selfIntro !== originalUserInfo.selfIntro
      ) {
        showChanges();
      } else {
        hideChanges();
      }
    }
  }, [originalUserInfo, userInfo]);

  return (
    <div className={styles.myProfileContainer}>
      <section className={styles.header}>
        <h3>个人资料</h3>
      </section>
      <section className={styles.main}>
        <div className={styles.settingContainer}>
          <div className={styles.changeProfilePic}>
            <p>头像</p>
            <button
              onClick={() => {
                inputFile.current.click();
              }}
            >
              更换头像
            </button>
            <input
              type='file'
              ref={inputFile}
              onChange={(e) => {
                setUserInfo({ ...userInfo, avatar: e.target.files[0] });
                setPreviewPic(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          <div className={styles.bannerColor}>
            <p>横幅颜色</p>
            <input
              type='color'
              value={userInfo.bannerColor}
              onChange={(e) => {
                setUserInfo({ ...userInfo, bannerColor: e.target.value });
              }}
            />
            <MdEdit className={styles.icon} />
          </div>
          <div className={styles.selfIntro}>
            <p>自我介绍</p>
            <textarea
              value={userInfo.selfIntro ?? ''}
              onChange={(e) => {
                setUserInfo({ ...userInfo, selfIntro: e.target.value });
              }}
            ></textarea>
          </div>
        </div>
        <div className={styles.previewContainer}>
          <p>预览</p>
          <PreviewProfile
            previewPic={previewPic}
            userInfo={userInfo}
            minutes={minutes}
            seconds={seconds}
          />
        </div>
      </section>
      {profileChange && (
        <SaveProfileChanges
          reset={reset}
          saveChanges={saveChanges}
          saveChangesMount={saveChangesMount}
          loading={loading}
        />
      )}
    </div>
  );
}
