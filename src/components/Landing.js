import React from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../helper/functions'
import Slider from '../shared/Slider';
import Carrousel from './Carrousel';
import styles from './Landing.module.css'

const Landing = () => {
  const productsState=useSelector(state=>state.productsState)

  return (
    <div className={styles.container}>
      <Carrousel />
      {
        getCategories(productsState.products).map((category,index)=><Slider key={index} category={category}/>)
      }
    </div>
  )
}

export default Landing