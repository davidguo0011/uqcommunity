import React from 'react';
import styles from './MyAccount.module.scss';
import MyAccountProfile from '../MyAccountProfile/MyAccountProfile';
import svg from '../../../assets/settingSVG.svg';

export default function MyAccount({ setCurrent }) {
  return (
    <div className={styles.myAccountContainer}>
      <section className={styles.myAccount}>
        <h3>我的账号</h3>
        <MyAccountProfile setCurrent={setCurrent} />
      </section>
      <section className={styles.myPassword}>
        <h3>密码</h3>
        <button>更改密码</button>
        <img src={svg} alt='' />
      </section>
      <section className={styles.deleteAccount}>
        <p>删除用户</p>
        <p>禁用您的账号意味着在执行此操作后，您可以随时恢复它。</p>
        <button className={styles.closeAccountBtn}>关闭帐户</button>
        <button className={styles.deleteAccountBtn}>删除帐户</button>
      </section>
    </div>
  );
}
