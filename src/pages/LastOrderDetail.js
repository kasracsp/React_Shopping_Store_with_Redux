import React,{useContext, useState, useEffect} from 'react'
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContextProvider";
import {
  filterUserOrders,
  userOrdersTotalPrice,
  userOrdersTotalQuantity,
} from "../helper/functions";
import { useParams } from 'react-router-dom'
import styles from './LastOrderDetail.module.css'
import Spinner from "../assets/Spinner.svg";

const LastOrderDetail = () => {
  const params = useParams()
  const lastOrdersState = useSelector((state) => state.lastOrdersState);
  const {user}=useContext(AuthContext)
  const [userOrder,setUserOrder]=useState([])

  useEffect(() => {
      if (lastOrdersState.orders && lastOrdersState.orders.length) {
        setUserOrder(
          filterUserOrders(lastOrdersState.orders, user.email).filter(
            (item) => item.id === Number(params.id)
          )
        );
      }
  }, [lastOrdersState]);

  return (
    <>  
      {lastOrdersState.loading ? (
        <img src={Spinner} alt="spinner" className={styles.spinner} />
      ) : lastOrdersState.error ? (
        <h2>{lastOrdersState.error}</h2>
      ) : 
        (userOrder.length > 0) &&
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>
              Total: $
              {userOrdersTotalPrice(userOrder[0].attributes.orders.orders)}
            </h4>
            <h4>
              Quantity:{" "}
              {userOrdersTotalQuantity(userOrder[0].attributes.orders.orders)}{" "}
              {userOrdersTotalQuantity(
                userOrder[0].attributes.orders.orders
              ) === 1
                ? "item"
                : "items"}
            </h4>
            <h5>
              {new Date(userOrder[0].attributes.createdAt).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </h5>
          </div>
          <div className={styles.orders}>
            {userOrder[0].attributes.orders.orders.map((item) => (
              <OrderItem key={item.id} product={item} isButtonsShow={true} />
            ))}
          </div>
        </div>
      }
    </>
  );
}

export default LastOrderDetail