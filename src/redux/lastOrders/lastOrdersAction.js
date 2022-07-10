import axios from "axios"

const fetchLastOrdersRequest=()=>{
  return {
    type:'FETCH_LAST_ORDERS_REQUEST'
  }
}
const fetchLastOrdersSuccess=orders=>{
  return {
    type:'FETCH_LAST_ORDERS_SUCCESS',
    payload:orders
  }
}
const fetchLastOrdersFailure=error=>{
  return {
    type:'FETCH_LAST_ORDERS_FAILURE',
    payload:error
  }
}

const fetchLastOrders=()=>{
  return (dispatch)=>{
    dispatch(fetchLastOrdersRequest());
    axios
      .get(
        "http://localhost:1337/api/orders?pagination[page]=1&pagination[pageSize]=100"
      )
      .then((response) => dispatch(fetchLastOrdersSuccess(response.data.data)))
      .catch((error) => dispatch(fetchLastOrdersFailure(error.message)));
  }
}

export default fetchLastOrders