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

export {getCategories,getSuggestions,getSelectedCategoryItems}