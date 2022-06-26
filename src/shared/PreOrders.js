import React from 'react'
import EmptyCart from '../assets/emptyCart.jpg'
import { Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const PreOrders = ({show,handler}) => {
  const ordersState=useSelector(state=>state.ordersState)
  return (
    <Offcanvas show={show} onHide={handler} placement='end'>
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
        <Stack gap={3}>
          {ordersState.totalItems ?
            <div>
              <Link to='/purchase' onClick={handler}>Purchase Now</Link>
              {
                ordersState.orders.map(item=><p key={item.id}>{item.title}</p>)
              }
            </div>:
            <div>
              <img src={EmptyCart} alt="emptyCart" />
              <h2>Time to start shopping!</h2>
              <h3>Your cart is empty</h3>
              <Link to='/products'>Shop rigth now</Link>
            </div>
          }
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default PreOrders