import React from 'react'
import styles from './OrderItem.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeItem } from '../redux/orders/ordersAction';
import Buttons from '../shared/Buttons';

const OrderItem = ({product}) => {
  const dispatch=useDispatch()
  return (
    <div className={styles.container}>
      <div className={styles.upDetail}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
        <Link to={`/product/${product.id}`} className={styles.productTitle}>{product.title}</Link>
        <span>${product.price}</span>
      </div>
      <div className={styles.downDetail}>
        <button onClick={()=>dispatch(removeItem(product))} className={styles.removeItem}>Remove</button>
        <Buttons product={product} />
      </div>
    </div>
  )
}

export default OrderItem