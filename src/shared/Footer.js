import React from 'react'
import styles from './Footer.module.css'
import { useSelector } from 'react-redux/es/exports'

const Footer = () => {
  const geolocationState=useSelector(state=>state.geolocationState)
  const {continent_name,country_flag,country_name}=geolocationState.location

  return (
    <div className={styles.container}>
      <div className={styles.conditions}>
        <div className={styles.logo}>
          <img
            src="https://live.staticflickr.com/65535/52187266808_149712a600_o.png"
            alt="logoAlt"
          />
          <img
            src="https://live.staticflickr.com/65535/52189316838_8a83683d14_b.jpg"
            alt="logo"
          />
        </div>
        {!geolocationState.loading && !geolocationState.error && (
          <div className={styles.location}>
            <div className={styles.continent}>
              <span className="material-icons">public</span>
              <span className={styles.continentName}>{continent_name}</span>
            </div>
            <div className={styles.continent}>
              <img src={country_flag} alt={country_name} />
              <span className={styles.continentName}>{country_name}</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.copyRight}>
        <p>&copy;2022 Acemarket.com. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer