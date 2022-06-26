const setInitialOrders=orders=>{
  return {
    type:'SET_INITIAL_ORDERS',
    payload:orders
  }
}
const addItem=product=>{
  return {
    type:'ADD_ITEM',
    payload:product
  }
}
const removeItem=product=>{
  return {
    type:'REMOVE_ITEM',
    payload:product
  }
}
const increaseItem=product=>{
  return {
    type:'INCREASE_ITEM',
    payload:product
  }
}
const decreaseItem=product=>{
  return {
    type:'DECREASE_ITEM',
    payload:product
  }
}
const clearItem=()=>{
  return {
    type:'CLEAR_ITEM',
  }
}
const checkoutItem=()=>{
  return {
    type:'CHECKOUT_ITEM',
  }
}
const setOrders=()=>{
  return (dispatch)=>{
    const initialOrdersState=JSON.parse(window.localStorage.getItem('orders'))
    if(initialOrdersState){
      dispatch(setInitialOrders(initialOrdersState))
    }
  }
}

export {
  addItem,
  removeItem,
  increaseItem,
  decreaseItem,
  clearItem,
  checkoutItem,
  setOrders
}