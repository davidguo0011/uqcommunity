import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import styles from './EditSetting.module.scss';
import { IoMdClose } from 'react-icons/io';
import { updateUserInfo } from '../../../api/user';
import BtnSpinner from '../../../components/Spinner/BtnSpinner/BtnSpinner';

import { toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';

function EditSetting({ setShowEditSetting, header, description, label }) {
  const userContext = useContext(UserContext);
  let content = null;
  let submitContent = null;
  if (label === '用户名') {
    content = userContext.userState.userName;
    submitContent = 'name';
  } else if (label === '电子邮箱') {
    content = userContext.userState.email;
    submitContent = 'email';
  } else {
    content = userContext.userState.phone;
    submitContent = 'phone';
  }
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [inputContent, setInputContent] = useState(content);
  const onSubmit = () => {
    const data = {
      id: userContext.userState.userId,
      password,
      [submitContent]: inputContent,
    };
    setLoading(true);
    updateUserInfo(data).then((res) => {
      setLoading(false);
      if (res.respCode === '051') {
        if (submitContent === 'name') {
          userContext.userDispatch({
            type: 'changeUserName',
            userName: inputContent,
          });
        } else if (submitContent === 'email') {
          userContext.userDispatch({
            type: 'changeEmail',
            email: inputContent,
          });
        } else {
          userContext.userDispatch({
            type: 'changePhone',
            phone: inputContent,
          });
        }
        toast.success(`Succefully changed ${submitContent}!`, {
          theme: 'colored',
        });
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
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <EditSetting
          setShowEditSetting={setShowEditSetting}
          header={header}
          description={description}
          label={label}
        />,
        document.getElementById('root')
      )}
    </>
  );
}
