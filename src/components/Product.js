import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import styles from './Product.module.css'

const Product = () => {
  const params=useParams()
  const productsState=useSelector(state=>state.productsState)
  const productData=productsState.products.filter(item=>item.id === Number(params.id))
  const {title,image}=productData[0]

  return (
    <div className={styles.container}>
        {
          productData.length ?
          <div className={styles.productSection}>
            <p>{title}</p>
            <img src={image} alt="d" />
          </div>:
          <Loading />
        }
    </div>
  )
}

export default Product