import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './EditSetting.module.scss';
import { IoMdClose } from 'react-icons/io';
import { updateUserInfo } from '../../../api/user';
import BtnSpinner from '../../../components/Spinner/BtnSpinner/BtnSpinner';

import { toast } from 'react-toastify';

function EditSetting({
  setShowEditSetting,
  header,
  description,
  label,
  userInfo,
  setUserInfo,
  setUserName,
}) {
  let content = null;
  let submitContent = null;
  let userInfoKey = null;
  if (label === '用户名') {
    content = `${userInfo.userName}`;
    submitContent = 'name';
    userInfoKey = 'userName';
  } else if (label === '电子邮箱') {
    content = userInfo.email;
    submitContent = 'email';
    userInfoKey = 'email';
  } else {
    content = userInfo.phone;
    submitContent = 'phone';
    userInfoKey = 'phone';
  }
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [inputContent, setInputContent] = useState(content);
  const onSubmit = () => {
    const data = {
      id: userInfo.userId,
      password,
      [submitContent]: inputContent,
    };
    setLoading(true);
    updateUserInfo(data).then((res) => {
      setLoading(false);
      if (res.respCode === '051') {
        setUserInfo({ ...userInfo, [userInfoKey]: inputContent });
        toast.success(`Succefully changed ${submitContent}!`, {
          theme: 'colored',
        });
        if (submitContent === 'userName') {
          setUserName(inputContent);
        }
        localStorage.setItem(userInfoKey, inputContent);
        setShowEditSetting(false);
      } else {
        toast.error(`${res.respMsg}`, { them: 'colored' });
      }
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.editContainer}>
        <section className={styles.mainContent}>
          <div className={styles.textContent}>
            <h2>{header}</h2>
            <p>{description}</p>
          </div>
          <div className={styles.inputContainer}>
            <label>{label}</label>
            <input
              type='text'
              value={inputContent}
              onChange={(e) => {
                setInputContent(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>密码</label>
            <input
              type='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </section>
        <section className={styles.btnContainer}>
          <button
            className={styles.cancel}
            onClick={() => {
              setShowEditSetting(false);
            }}
          >
            取消
          </button>
          <button onClick={onSubmit}>
            {loading ? <BtnSpinner /> : '完成'}
          </button>
        </section>
        <button
          onClick={() => {
            setShowEditSetting(false);
          }}
          className={styles.closeEditSetting}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}

export default function EditSettingPortal({
  setShowEditSetting,
  header,
  description,
  label,
  userInfo,
  setUserInfo,
  setUserName,
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <EditSetting
          setShowEditSetting={setShowEditSetting}
          header={header}
          description={description}
          label={label}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setUserName={setUserName}
        />,
        document.getElementById('root')
      )}
    </>
  );
}
