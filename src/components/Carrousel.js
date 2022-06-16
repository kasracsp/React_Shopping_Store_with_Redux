import React from 'react'
import electronic from '../assets/electronic.jpg'
import men from '../assets/men.jpg'
import women from '../assets/women.jpg'
import jewelry from '../assets/jewelry.jpg'

const Carrousel = () => {
  const carrouselList=[
    {
      id:1,
      title:'electronic',
      image:electronic
    },
    {
      id:2,
      title:'men',
      image:men
    },
    {
      id:3,
      title:'women',
      image:women
    },
    {
      id:4,
      title:'jewelry',
      image:jewelry
    },
  ]
  return (
    <div>
      {carrouselList.map(item=><img src={item.image} alt={item.title} key={item.id} style={{width:'100%'}}/>)}
    </div>
  )
}

export default Carrousel