import React from 'react';
import styles from './LoadPageSpinner.module.scss';
export default function LoadPageSpinner() {
  return (
    <div className={styles.pageContainer}>
      <span className={styles.bearLoader}></span>
      <span className={styles.barLoader}></span>
    </div>
  );
}
