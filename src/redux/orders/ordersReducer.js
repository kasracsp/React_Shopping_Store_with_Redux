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
    case 'SET_INITIAL_ORDERS':
      return {
        ...state,
        orders:[...action.payload],
        ...sumItems(action.payload),
      }
    case 'ADD_ITEM':
      if(!state.orders.find(item=>item.id === action.payload.id)){
        state.orders.push({
          ...action.payload,
          quantity:1
        })
      }
      window.localStorage.setItem('orders',JSON.stringify(state.orders))
      return {
        ...state,
        orders:[...state.orders],
        checkout:false,
        ...sumItems(state.orders)
      }
    case 'REMOVE_ITEM':
      const filteredOrders=state.orders.filter(item=>item.id !== action.payload.id)
      window.localStorage.setItem('orders',JSON.stringify(filteredOrders))
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
      window.localStorage.setItem('orders',JSON.stringify(state.orders))
      return {
        ...state,
        ...sumItems(state.orders)
      }
    case 'DECREASE_ITEM':
      const indexD=state.orders.findIndex(item=>item.id === action.payload.id)
      if(indexD>-1){
        state.orders[indexD].quantity--
      }
      window.localStorage.setItem('orders',JSON.stringify(state.orders))
      return {
        ...state,
        ...sumItems(state.orders)
      }
    case 'CLEAR_ITEM':
      window.localStorage.removeItem('orders')
      return {
        orders:[],
        checkout:false,
        totalItems:0,
        totalPrice:0
      }
    case 'CHECKOUT_ITEM':
      window.localStorage.removeItem('orders')
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