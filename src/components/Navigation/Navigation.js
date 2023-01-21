import React from 'react';
import styles from '../Navigation/Navigation.module.scss';
export default function Navigation() {
  return (
    <nav className={styles.navContainer}>
      <div>UQ community</div>
      <ul>
        <li>Download</li>
        <li>Nitro</li>
        <li>Discover</li>
        <li>Safety</li>
      </ul>
      <div className={styles.buttonContainer}>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </nav>
  );
}
