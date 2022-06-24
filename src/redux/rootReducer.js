import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import geolocationReducer from './geolocation/geolocationReducer'
import filterReducer from './filter/filterReducer'
import ordersReducer from './orders/ordersReducer'

const rootReducer=combineReducers({
  productsState:productsReducer,
  geolocationState:geolocationReducer,
  filterState:filterReducer,
  ordersState:ordersReducer,
})

export default rootReducer