import React from 'react';
import styles from './SaveProfileChanges.module.scss';
import BtnSpinner from '../../../components/Spinner/BtnSpinner/BtnSpinner';
export default function SaveProfileChanges({
  saveChangesMount,
  reset,
  saveChanges,
  loading,
}) {
  return (
    <div
      className={[
        styles.saveProfileChangesContainer,
        saveChangesMount ? styles.onMount : styles.unMount,
      ].join(' ')}
    >
      <p>注意！您尚未保存更改</p>
      <div className={styles.btnContainer}>
        <button
          onClick={() => {
            reset();
          }}
        >
          重置
        </button>
        <button
          className={styles.saveChangesBtn}
          onClick={() => {
            saveChanges();
          }}
        >
          {loading ? <BtnSpinner /> : '保存更改'}
        </button>
      </div>
    </div>
  );
}
