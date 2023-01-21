import React from 'react';
import styles from './HomePage.module.scss';
import Navigation from '../../components/Navigation/Navigation';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <div className={styles.homepageContainer}>
        <section className={styles.homepageLanding}>
          <div className={styles.homepageTextContent}>
            <h2>IMAGINE A PLACE...</h2>
            <p>
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
