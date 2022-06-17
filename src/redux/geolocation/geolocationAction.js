import axios from "axios"

const fetchGeolocationRequest=()=>{
  return {
    type:'FETCH_GEOLOCATION_REQUEST',
  }
}
const fetchGeolocationSuccess=location=>{
  return {
    type:'FETCH_GEOLOCATION_SUCCESS',
    payload:location
  }
}
const fetchGeolocationFailure=()=>{
  return {
    type:'FETCH_GEOLOCATION_FAILURE'
  }
}

const fetchGeolocation=()=>{
  return (dispatch)=>{
    dispatch(fetchGeolocationRequest())
    axios.get(`https://api.ipggeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEOLOCATION_IP_KEY}`)
    .then(response=>dispatch(fetchGeolocationSuccess(response.data)))
    .catch(error=>dispatch(fetchGeolocationFailure()))
  }
}

export default fetchGeolocation