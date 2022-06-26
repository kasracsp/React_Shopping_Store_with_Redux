import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removeItem, increaseItem, decreaseItem } from '../redux/orders/ordersAction';
import { calcQuantity } from '../helper/functions';
import styles from './Buttons.module.css'
const Buttons = ({product,isInProduct}) => {
  const ordersState=useSelector(state=>state.ordersState)
  const dispatch=useDispatch()

  return (
    <div className={isInProduct?styles.secondAdd:styles.container}>
      {calcQuantity(ordersState.orders,product.id)===1 && <button className={styles.delete} onClick={()=>dispatch(removeItem(product))}><span className='material-icons'>delete</span></button>}
      {calcQuantity(ordersState.orders,product.id)>1 && <button className={styles.remove} onClick={()=>dispatch(decreaseItem(product))}><span className='material-icons'>remove</span></button>}
      <span className={styles.quentity}>{calcQuantity(ordersState.orders,product.id)}</span>
      <button className={styles.add} onClick={()=>dispatch(increaseItem(product))}><span className='material-icons'>add</span></button>
    </div>
  )
}

export default Buttons