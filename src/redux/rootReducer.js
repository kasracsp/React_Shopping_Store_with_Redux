import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import geolocationReducer from './geolocation/geolocationReducer'
import filterReducer from './filter/filterReducer'

const rootReducer=combineReducers({
  productsState:productsReducer,
  geolocationState:geolocationReducer,
  filterState:filterReducer,
})

export default rootReducer