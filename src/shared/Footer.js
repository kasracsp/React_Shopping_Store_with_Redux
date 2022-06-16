import React from 'react'
import styles from './Footer.module.css'
import { useSelector } from 'react-redux/es/exports'

//assets
import logoAlt from '../assets/logoAlt.png'
import logo from '../assets/logo.png'

const Footer = () => {
  const geolocationState=useSelector(state=>state.geolocationState)
  const {continent_name,country_flag,country_name}=geolocationState.location

  return (
    <div className={styles.container}>
      <div className={styles.conditions}>
        <div className={styles.logo}>
          <img src={logoAlt} alt='logoAlt' />
          <img src={logo} alt='logo' />
        </div>
        {
          !geolocationState.loading && !geolocationState.error &&
          <div className={styles.location}>
            <div className={styles.continent}>
              <span className='material-icons'>public</span>
              <span>{continent_name}</span>
            </div>
            <div className={styles.continent}>
              <img src={country_flag} alt={country_name} />
              <span>{country_name}</span> 
            </div>
          </div>
        }
      </div>
      <div className={styles.copyRight}>
        <p>&copy;2022 Acemarket.com. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer