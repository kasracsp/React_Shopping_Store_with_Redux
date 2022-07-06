import React from 'react'
import { useParams } from 'react-router-dom'

const LastOrderDetail = () => {
  const params = useParams()

  return (
    <div>LastOrderDetail: {params.id}</div>
  )
}

export default LastOrderDetail