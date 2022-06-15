import React,{ useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'

const Products = () => {
  const location=useLocation()

  useEffect(()=>{
    if(queryString.parse(location.search).category){
      console.log(queryString.parse(location.search))
    }
  },[location])

  return (
    <div>
      <Link to='/'>Back</Link>
    </div>
  )
}

export default Products