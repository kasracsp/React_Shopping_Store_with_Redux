const getCategories=(state)=>{
  const allCategories=state.map(item=>item.category)
  const categories=allCategories.filter((item,index)=> allCategories.indexOf(item)===index)
  return categories
}

const getSuggestions=(state,key)=>{
  if(key.trim().length>0){
    const suggestions=state.filter(item=>item.title.toLowerCase().includes(key.trim().toLowerCase()))
    return suggestions
  }
  return []
}

const getSelectedCategoryItems=(state,category)=>{
  const categoryItems=state.filter(item=>item.category === category)
  return categoryItems
}

const isInCategory=(categories,key)=>{
  const isIn=!!categories.find(item=>item===key)
  return isIn
}

const isInOrders=(orders,key)=>{
  const isInOrder=!!orders.find(item=>item.id===key)
  return isInOrder
}

const calcQuantity=(orders,key)=>{
  const indexO=orders.findIndex(item=>item.id === key)
  if(indexO>-1){
    return orders[indexO].quantity
  }else{
    return false
  }
}

const whichPage=(location)=>{
  const pageRoute=location.split('/')[2]
  return pageRoute
}

const filterUserOrders=(orders,user)=>{
  const filteredOrders = orders.filter((item) => item.attributes.userId === user);
  return filteredOrders
}

export {
  getCategories,
  getSuggestions,
  getSelectedCategoryItems,
  isInCategory,
  isInOrders,
  calcQuantity,
  whichPage,
  filterUserOrders,
};