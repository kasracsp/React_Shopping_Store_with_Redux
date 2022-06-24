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

export {
  addItem,
  removeItem,
  increaseItem,
  decreaseItem,
  clearItem,
  checkoutItem
}