const filterProducts=(state,filters)=>{
  let filteredData=[...state]
  console.log(filters.rate)

  if(filters.category.length){
    const catList=[]
    filters.category.forEach(category=>{
      const catFilter=filteredData.filter(item=>item.category === category)
      catList.push(...catFilter)
    })
    filteredData=catList
  }

  filteredData=filteredData.filter(item=>item.rating.rate>=filters.rate)

  if(filters.sort==='price high'){
    filteredData.sort((a,b)=>{
      return b.price - a.price
    })
  }
  if(filters.sort==='price low'){
    filteredData.sort((a,b)=>{
      return a.price - b.price
    })
  }
  if(filters.sort==='best rate'){
    filteredData.sort((a,b)=>{
      return b.rating.rate - a.rating.rate
    })
  }

  console.log(filteredData)
  return filteredData
}

export {filterProducts}