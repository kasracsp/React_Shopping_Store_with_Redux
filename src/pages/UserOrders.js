import React,{useEffect, useContext} from 'react'
import { AuthContext } from "../context/AuthContextProvider";
import {
  filterUserOrders,
  userOrdersTotalPrice,
  userOrdersTotalQuantity,
} from "../helper/functions";
import fetchLastOrders from "../redux/lastOrders/lastOrdersAction";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../components/OrderItem';
import styles from "./UserOrders.module.css";
import Spinner from "../assets/Spinner.svg";

const UserOrders = () => {
  const { user } = useContext(AuthContext);
  const lastOrdersState = useSelector((state) => state.lastOrdersState);
  const dispatch=useDispatch()

  
  useEffect(()=>{
    dispatch(fetchLastOrders());
  },[])
  
  if(lastOrdersState.orders.length){
    //all user orders
    console.log(lastOrdersState.orders)
    //one of orders
    console.log(lastOrdersState.orders[0].attributes.orders.orders);
    //data
    console.log(new Date(lastOrdersState.orders[0].attributes.createdAt).toLocaleString('en-US',{year:'numeric',month:'long',day:'numeric'}));
  }

  return (
    <div className={styles.container}>
      {lastOrdersState.loading ? (
        <img src={Spinner} alt="spinner" className={styles.spinner} />
      ) : lastOrdersState.error ? (
        <h2>{lastOrdersState.error}</h2>
      ) : (
        // filterUserOrders(lastOrdersState.orders, user.email).map((item,index) => (

        // ))
        filterUserOrders(lastOrdersState.orders, user.email).map(
          (item, index) => (
            <Link
              to={`/profile/lastorderdetail/${item.id}`}
              className={styles.lastOrder}
              key={item.id}
            >
              <div className={styles.leftDetail}>
                <h5>{index + 1}</h5>
                <div className={styles.images}>
                  {item.attributes.orders.orders.map((order) => (
                    <img src={order.image} key={order.id} alt={order.title} />
                  ))}
                </div>
              </div>
              <h4>
                total: ${userOrdersTotalPrice(item.attributes.orders.orders)}
              </h4>
              <h4>
                quantity:
                {userOrdersTotalQuantity(item.attributes.orders.orders)}{" "}
                {userOrdersTotalQuantity(item.attributes.orders.orders) === 1
                  ? "item"
                  : "items"}
              </h4>
              <h5>
                {new Date(
                  lastOrdersState.orders[0].attributes.createdAt
                ).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h5>
            </Link>
          )
        )
      )}
    </div>
  );
}

export default UserOrders