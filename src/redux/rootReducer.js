import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import geolocationReducer from './geolocation/geolocationReducer'
import filterReducer from './filter/filterReducer'
import ordersReducer from './orders/ordersReducer'
import lastOrdersReducer from "./lastOrders/lastOrdersReducer"
import commentsReducer from './comments/commentsReducer'

const rootReducer = combineReducers({
  productsState: productsReducer,
  geolocationState: geolocationReducer,
  filterState: filterReducer,
  ordersState: ordersReducer,
  lastOrdersState: lastOrdersReducer,
  commentsState:commentsReducer,
});

export default rootReducer