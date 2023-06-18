import React from 'react';
import Content from './Content';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
        <Content />
    </div>
  )
}

export default Home