import React, { useEffect } from "react";
import OrderItem from "../components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { clearItem, checkoutItem } from "../redux/orders/ordersAction";
import { Link } from "react-router-dom";
import EmptyCartImage from "../assets/emptyCart.jpg";
import CheckoutImage from "../assets/checkoutSuccess.png";
import styles from "./Purchase.module.css";

const Purchase = () => {
  const ordersState = useSelector((state) => state.ordersState);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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
                onClick={() => dispatch(checkoutItem())}
                className={styles.checkout}
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
        </div>
      )}
      {!ordersState.checkout && ordersState.totalItems === 0 && (
        <div className={styles.emptyWrapper}>
          <div className={styles.emptyContainer}>
            <h2>Your cart is empty!</h2>
            <img src={EmptyCartImage} alt="emptyCart" />
            <h3>Time to start shopping!</h3>
            <Link to="/products">Shop right now</Link>
          </div>
        </div>
      )}
      {ordersState.checkout && ordersState.totalItems === 0 && (
        <div className={styles.emptyWrapper}>
          <div className={styles.emptyContainer}>
            <img src={CheckoutImage} alt="emptyCart" />
            <h2>Checkout Successfully!</h2>
            <Link to="/products">Buy More</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Purchase;
