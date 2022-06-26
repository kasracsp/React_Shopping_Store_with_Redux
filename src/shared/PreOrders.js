import React from 'react'
import OrderItem from '../components/OrderItem'
import EmptyCart from '../assets/emptyCart.jpg'
import { Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './PreOrders.scss'

const PreOrders = ({show,handler}) => {
  const ordersState=useSelector(state=>state.ordersState)
  return (
    <Offcanvas show={show} onHide={handler} placement='end' className='preOrder_container'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {
            ordersState.totalItems?
            <div>
              Total: ${ordersState.totalPrice} / <small>
                {ordersState.totalItems}  {ordersState.totalItems === 1 ? 'item' : 'items'}
              </small>
            </div>:
            'Your cart is empty'
          }
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack>
          {ordersState.totalItems ?
            <div className='offcanvas-exist'>
              <Link to='/purchase' onClick={handler}className='linkToProducts'>Purchase Now</Link>
              {
                ordersState.totalItems &&
                ordersState.orders.map(item=>
                  <OrderItem key={item.id} product={item}/>
                )
              }
            </div>:
            <div className='offcanvas-empty'>
              <img src={EmptyCart} alt="emptyCart" />
              <h3>Time to start shopping!</h3>
              <Link to='/products' onClick={handler}>Shop rigth now</Link>
            </div>
          }
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default PreOrders