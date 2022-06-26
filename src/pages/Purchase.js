import React from 'react'
import OrderItem from '../components/OrderItem'
import { useSelector,useDispatch } from 'react-redux'
import { clearItem, checkoutItem } from '../redux/orders/ordersAction'
import styles from './Purchase.module.css'

const Purchase = () => {
  const ordersState=useSelector(state=>state.ordersState)
  const dispatch=useDispatch()
  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        {
          ordersState.totalItems &&
          ordersState.orders.map(item=>
            <OrderItem key={item.id} product={item}/>
          )
        }
      </div>
      <div className={styles.totals}>
        <div className={styles.section}>
          <button onClick={()=>dispatch(checkoutItem())} className={styles.checkout}>Continue to checkout</button>
        </div>
        <div className={styles.section}>
          <h4>Total <span>({ordersState.totalItems} {ordersState.totalItems===1?'item':'items'})</span></h4>
          <h4>${ordersState.totalPrice}</h4>
        </div>
        <button onClick={()=>dispatch(clearItem())}className={styles.clearAll}>Clear All</button>
      </div>
    </div>
  )
}

export default Purchase