import React,{useEffect, useContext} from 'react'
import { AuthContext } from "../context/AuthContextProvider";
import { filterUserOrders } from '../helper/functions';
import fetchLastOrders from "../redux/lastOrders/lastOrdersAction";
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
        //   <OrderItem
        //     key={index}
        //     product={lastOrdersState.orders.attributes}
        //   />
        // ))
        filterUserOrders(lastOrdersState.orders, user.email).map((item) => (
          <p key={item.id}>{item.id}</p>
        ))
      )}
    </div>
  );
}

export default UserOrders