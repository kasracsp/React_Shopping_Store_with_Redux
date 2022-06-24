const initialState={
  orders:[],
  checkout:false,
  totalItems:0,
  totalPrice:0
}

const sumItems=(state)=>{
  const totalItems=state.reduce((total,item)=>
    total + item.quantity
  ,0);
  const totalPrice=state.reduce((total,item)=>
    total + item.price * item.quantity
  ,0).toFixed(2);
  return {totalItems,totalPrice}
}

const ordersReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'ADD_ITEM':
      if(!state.orders.find(item=>item.id === action.payload.id)){
        state.orders.push({
          ...action.payload,
          quantity:1
        })
      }
      return {
        ...state,
        orders:[...state.orders],
        checkout:false,
        ...sumItems(state.orders)
      }
    case 'REMOVE_ITEM':
      const filteredOrders=state.orders.filter(item=>item.id !== action.payload.id)
      return {
        ...state,
        orders:[...filteredOrders],
        ...sumItems(filteredOrders)
      }
    case 'INCREASE_ITEM':
      const indexI=state.orders.findIndex(item=>item.id === action.payload.id)
      if(indexI>-1){
        state.orders[indexI].quantity++
      }
      return {
        ...state,
        ...sumItems(state.orders)
      }
    case 'DECREASE_ITEM':
      const indexD=state.orders.findIndex(item=>item.id === action.payload.id)
      if(indexD>-1){
        state.orders[indexD].quantity--
      }
      return {
        ...state,
        ...sumItems(state.orders)
      }
    case 'CLEAR_ITEM':
      return {
        orders:[],
        checkout:false,
        totalItems:0,
        totalPrice:0
      }
    case 'CHECKOUT_ITEM':
      return {
        orders:[],
        checkout:true,
        totalItems:0,
        totalPrice:0
      }
      
    default:
      return state
  }
}

export default ordersReducer