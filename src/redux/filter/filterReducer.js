const initialState={
  sort:'best rate',
  category:[],
  rate:1,
  minValue:0,
  maxValue:1000
}
const filterReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'SORT_BY':
      return {
        ...state,
        sort:action.payload
      }
    case 'FILTER_BY_CATEGORY':
      const indexF=state.category.indexOf(action.payload)
      if(indexF===-1){
        state.category.push(action.payload)
      }else{
        state.category.splice(indexF,1)
      }
      return {
        ...state,
        category:[...state.category]
      }
    case 'FILTER_BY_RATE':
      return {
        ...state,
        rate:action.payload
      }
    case 'MIN_PRICE_FILTER':
      return {
        ...state,
        minValue:action.payload
      }
    case 'MAX_PRICE_FILTER':
      return {
        ...state,
        maxValue:action.payload
      }
    case 'CLEAR_ALL_FILTERS':
      return {
        sort:'best rate',
        category:[],
        rate:1,
        minValue:0,
        maxValue:1000
      }
    default:
      return state
  }
}

export default filterReducer