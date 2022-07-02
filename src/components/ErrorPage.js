import React from 'react'
import ErrorSVG from '../assets/errorPage.svg'
import styles from './ErrorPage.module.css'

const ErrorPage = ({error}) => {
  return (
    <div className={styles.container}>
      <img src={ErrorSVG} alt="error" />
      <h1>Uh-oh...</h1>
      <h3>{error}</h3>
      <h4>Please try again in a few minutes.</h4>
    </div>
  )
}

export default ErrorPage