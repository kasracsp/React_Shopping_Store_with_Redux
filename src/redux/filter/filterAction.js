const sortBy=sort=>{
  return {
    type:'SORT_BY',
    payload:sort
  }
}
const filterByCategory=category=>{
  return {
    type:'FILTER_BY_CATEGORY',
    payload:category
  }
}
const filterByRate=rate=>{
  return {
    type:'FILTER_BY_RATE',
    payload:rate
  }
}
const minPriceFilter=price=>{
  return {
    type:'MIN_PRICE_FILTER',
    payload:price
  }
}
const maxPriceFilter=price=>{
  return {
    type:'MAX_PRICE_FILTER',
    payload:price
  }
}
const clearAllFilters=()=>{
  return {
    type:'CLEAR_ALL_FILTERS'
  }
}

export {
  sortBy,
  filterByCategory,
  filterByRate,
  clearAllFilters,
  minPriceFilter,
  maxPriceFilter
}