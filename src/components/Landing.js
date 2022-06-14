import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Landing = () => {
  const productsState=useSelector(state=>state.productsState)

  return (
    <div>
      <Link to='/products'>products</Link>
      {productsState.loading?
        <p>loading...</p>:
          productsState.error?
          <p>{productsState.error}</p>:
          productsState.products.map(item=><p key={item.id}>{item.id} - {item.title}</p>)}
    </div>
  )
}

export default Landing