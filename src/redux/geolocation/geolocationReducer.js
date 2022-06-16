const initialState={
  loading:false,
  location:{},
  error:false
}
const geolocationReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'FETCH_GEOLOCATION_REQUEST':
      return {
        ...state,
        loading:true
      }
    case 'FETCH_GEOLOCATION_SUCCESS':
      return {
        ...state,
        loading:false,
        location:action.payload,
        error:false
      }
    case 'FETCH_GEOLOCATION_FAILURE':
      return {
        ...state,
        loading:false,
        error:true
      }
    default:
      return state
  }
}

export default geolocationReducer