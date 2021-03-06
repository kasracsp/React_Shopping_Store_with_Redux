import React, { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import OrderItem from "../components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { clearItem, checkoutItem } from "../redux/orders/ordersAction";
import { Link } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../context/AuthContextProvider'
import styles from "./Purchase.module.css";
import "react-toastify/dist/ReactToastify.css";

const Purchase = () => {
  const ordersState = useSelector((state) => state.ordersState);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [isSubmitting,setIsSubmitting]=useState(false)
  const notify = (text) =>
    toast.error(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const checkoutHandler=async ()=>{
    setIsSubmitting(true)
    if(user){
      const data = {
        data: {
          userId: user.email,
          orders: {
            orders: [...ordersState.orders],
          },
        },
      };
      try {
        await axios.post("http://localhost:1337/api/orders",data)
        dispatch(checkoutItem())
        setIsSubmitting(false);
      } catch (error) {
        notify("Request failed, Please try again!");
        setIsSubmitting(false);
      }
    }else{
      notify("Please sign in first!");
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {ordersState.totalItems > 0 && (
        <div className={styles.container}>
          <div className={styles.orders}>
            {ordersState.orders.map((item) => (
              <OrderItem key={item.id} product={item} />
            ))}
          </div>
          <div className={styles.totals}>
            <div className={styles.section}>
              <h2>
                Total{" "}
                <span>
                  ({ordersState.totalItems}{" "}
                  {ordersState.totalItems === 1 ? "item" : "items"})
                </span>
              </h2>
              <h2>${ordersState.totalPrice}</h2>
            </div>
            <div className={styles.section}>
              <button
                onClick={checkoutHandler}
                className={styles.checkout}
                disabled={isSubmitting}
              >
                Continue to checkout
              </button>
            </div>
            <button
              onClick={() => dispatch(clearItem())}
              className={styles.clearAll}
            >
              Clear All
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
      {!ordersState.checkout && ordersState.totalItems === 0 && (
        <div className={styles.emptyWrapper}>
          <div className={styles.emptyContainer}>
            <h2>Your cart is empty!</h2>
            <img
              src="https://live.staticflickr.com/65535/52187511674_39f85b970a_b.jpg"
              alt="emptyCart"
            />
            <h3>Time to start shopping!</h3>
            <Link to="/products">Shop right now</Link>
          </div>
        </div>
      )}
      {ordersState.checkout && ordersState.totalItems === 0 && (
        <div className={styles.emptyWrapper}>
          <div className={styles.emptyContainer}>
            <img
              src="https://live.staticflickr.com/65535/52186239442_020fa0c70f_o.png"
              alt="emptyCart"
            />
            <h2>Checkout Successfully!</h2>
            <h3>
              You can track your orders{" "}
              <Link to="/profile/userorders">here</Link>
            </h3>
            <Link to="/products">Buy More</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Purchase;