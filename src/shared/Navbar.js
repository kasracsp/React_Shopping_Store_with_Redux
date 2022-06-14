import React,{ useState } from 'react'
import { Link } from 'react-router-dom'

//styles
import styles from './Navbar.module.css'

//assets
import logo from '../assets/logo.png'

const Navbar = () => {
  const [openMenu,setOpenMenu]=useState(false)

  return (
    <div className={styles.container} >
      <div className={styles.leftNav}>
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <div className={styles.categoriesContainer}>
          <div to='/products' className={styles.categoriesTitle}>
            <span className='material-icons'>list</span>
            <p>categories</p>
            <span className='material-icons' id={styles.expand}>expand_more</span>
          </div>
          <div className={styles.categories} id={openMenu ? styles.show : ''}>
            <Link to='/'>jewelry</Link>
            <Link to='/'>women's clothing</Link>
            <Link to='/'>men's clothing</Link>
            <Link to='/'>electronics</Link>
            <Link to='/products'>all categories</Link>
          </div>
        </div>  
      </div>

      <div className={styles.search}>

      </div>

      <div className={styles.rigthNav}>

      </div>
      
      <div className={styles.menuBurger} onClick={()=>setOpenMenu(!openMenu)}>
        <div className={styles.burger}  id={openMenu ? styles.show : ''}>
        </div>
      </div>
    </div>
  )
}

export default Navbar