import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Carrousel from './Carrousel';
import styles from './Landing.module.css'

const Landing = () => {
  const productsState=useSelector(state=>state.productsState)

  return (
    <div className={styles.container}>
      <Carrousel />
    </div>
  )
}

export default Landing