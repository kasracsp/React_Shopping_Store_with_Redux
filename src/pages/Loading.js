import React from 'react'
import styles from './Loading.module.css'

//assets
import logoAlt from '../assets/logoAlt.png'
import logo from '../assets/logo.png'

const Loading = () => {
  return (
    <div className={styles.container}>
      <img src={logoAlt} alt="logoAlt" className={styles.logoAlt} />
      <img src={logo} alt="logo" className={styles.logo} />
    </div>
  )
}

export default Loading