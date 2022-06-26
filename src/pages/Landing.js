import React from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../helper/functions'
import Slider from '../shared/Slider';
import Carrousel from '../components/Carrousel';
import styles from './Landing.module.css'

const Landing = () => {
  const productsState=useSelector(state=>state.productsState)

  return (
    <div className={styles.container}>
      <Carrousel />
      <div className={styles.slider}>
        {
          getCategories(productsState.products).map((category,index)=><Slider key={index} category={category} title={category}/>)
        }
      </div>
    </div>
  )
}

export default Landing