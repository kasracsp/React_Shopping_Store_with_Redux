import React from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'

const Card = ({product}) => {
  const {id,title,image,price,rating}=product

  return (
    <div className={styles.container}>
      <Link to={`/product/${id}`} className={styles.thumb}>
        <img src={image} alt={title} />
      </Link>
        <Link to={`/product/${id}`} className={styles.title}>{title}</Link>
      <div className={styles.details}>
        <h4  className={styles.price}>${price}</h4>
        <div className={styles.rating}>
          <span className='material-icons'>star</span>
          <p className={styles.rate}>{rating.rate}</p>
        </div>
      </div>
    </div>
  )
}

export default Card