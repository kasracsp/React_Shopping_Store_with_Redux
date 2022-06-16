import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import geolocationReducer from './geolocation/geolocationReducer'

const rootReducer=combineReducers({
  productsState:productsReducer,
  geolocationState:geolocationReducer,
})

export default rootReducer