import React,{useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './Product.module.css'
import {Magnifier,SideBySideMagnifier} from "react-image-magnifiers";
import Slider from '../shared/Slider';
import { useSelector, useDispatch } from 'react-redux'
import { isInOrders } from '../helper/functions';
import { addItem } from '../redux/orders/ordersAction';
import Buttons from '../shared/Buttons';

const Product = () => {
  const params=useParams()
  const productsState=useSelector(state=>state.productsState)
  const ordersState=useSelector(state=>state.ordersState)
  const dispatch=useDispatch()

  const productData=productsState.products.filter(item=>item.id === Number(params.id))

  useEffect(()=>{
    window.scrollTo({
      top:0
    })
  },[params])

  return (
    <>
    {
      productData.length &&
        <div className={styles.container}>
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
              <h3 className={styles.title}>{productData[0].title}</h3>
              <div className={styles.description}>
                <p>product details:</p>
                <ul>
                  {(productData[0].description.split(', ')).map((item,index)=>
                    <li key={index}>{item}</li>
                  )}
                </ul>

              </div>
              <div className={styles.priceSection}>
                <span className={styles.price}>${productData[0].price}</span>
                <div className={styles.buttons}>
                  {isInOrders(ordersState.orders,productData[0].id)?
                    <Buttons product={productData[0]} isInProduct={true}/>:
                    <button className={styles.firstAdd} onClick={()=>dispatch(addItem(productData[0]))}>add to cart</button>
                  }
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.rating}>
                  <span className='material-icons'>star</span>
                  <p className={styles.rate}>({productData[0].rating.rate}) {productData[0].rating.count} reviews</p>
                </div>
                <Link to={`/products?category=${productData[0].category}`} className={styles.category}>{productData[0].category}</Link>
              </div>
            </div>
          </div>
          <div className={styles.sameProducts}>
            <Slider category={productData[0].category} title='you may also like' isShow={true} />
          </div>
        </div>
      }
    </>
  )
}

export default Product