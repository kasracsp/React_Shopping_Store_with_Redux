import React from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../redux/orders/ordersAction'
import { isInOrders } from '../helper/functions'
import Buttons from './Buttons'

const Card = ({product,isShow}) => {
  const {id,title,image,price,rating}=product
  const ordersState=useSelector(state=>state.ordersState)
  const dispatch=useDispatch()

  return (
    <div className={styles.container}>
      <Link to={`/product/${id}`} className={styles.thumb}>
        <img src={image} alt={title} />
      </Link>
        <Link to={`/product/${id}`} className={styles.title}>{title}</Link>
      <div className={styles.details}>
        <h4  className={styles.price}>${price}</h4>
        <div className={styles.rating}>
          <span className='material-icons'>star</span>
          <p className={styles.rate}>{rating.rate}</p>
        </div>
      </div>
      {isShow &&
        <div className={styles.buttons}>
          {isInOrders(ordersState.orders,product.id)?
            <Buttons product={product}/>:
            <button className={styles.firstAdd} onClick={()=>dispatch(addItem(product))}>add to cart</button>
          }
        </div>
      }
    </div>
  )
}

export default Card