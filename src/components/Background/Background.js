import React from 'react';
import styles from './Background.module.scss';
export default function Background(props) {
  return <div className={styles.container}>{props.children}</div>;
}
