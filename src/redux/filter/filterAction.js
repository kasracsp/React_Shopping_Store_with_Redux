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
const clearAllFilters=()=>{
  return {
    type:'CLEAR_ALL_FILTERS'
  }
}

export {sortBy,filterByCategory,filterByRate,clearAllFilters}