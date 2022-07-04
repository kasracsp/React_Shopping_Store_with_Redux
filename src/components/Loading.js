import React from 'react'
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://live.staticflickr.com/65535/52187266808_149712a600_o.png"
        alt="logoAlt"
        className={styles.logoAlt}
      />
      <img
        src="https://live.staticflickr.com/65535/52189316838_8a83683d14_b.jpg"
        alt="logo"
        className={styles.logo}
      />
    </div>
  );
}

export default Loading