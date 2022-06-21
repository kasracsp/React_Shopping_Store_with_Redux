import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './Product.module.css'
import {Magnifier,SideBySideMagnifier} from "react-image-magnifiers";

const Product = () => {
  const params=useParams()
  const productsState=useSelector(state=>state.productsState)

  const productData=productsState.products.filter(item=>item.id === Number(params.id))

  return (
    <div className={styles.container}>
        {
          productData.length &&
          <div className={styles.productSection}>
            <div className={styles.productThumb}>
              <Magnifier
                imageSrc={productData[0].image}
                imageAlt={productData[0].title}
                className={styles.Magnifier}
              />
              <SideBySideMagnifier
                imageSrc={productData[0].image}
                fillAvailableSpace={false}
                imageAlt={productData[0].title}
                overlayBoxColor='#fff'
                overlayBackgroundColor='black'
                inPlaceMinBreakpoint={768}
                className={styles.sideBySide}
              />
            </div>
            <div className={styles.productDetails}>
              <h5>{productData[0].title}</h5>
            </div>
          </div>
        }
    </div>
  )
}

export default Product