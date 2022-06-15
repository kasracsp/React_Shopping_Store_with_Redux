import React,{ useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCategories, getSuggestions } from '../helper/functions'
import { v4 } from 'uuid'

//styles
import styles from './Navbar.module.css'

//assets
import logo from '../assets/logo.png'

const Navbar = () => {
  const productsState=useSelector(state=>state.productsState)
  const [openMenu,setOpenMenu]=useState(false)
  const [search,setSearch]=useState('')
  const [suggestionList,setSuggestionList]=useState([])
  const searchRef=useRef()

  useEffect(()=>{
    let handler=(event)=>{
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setSuggestionList([])
      }
    }
    document.addEventListener('mousedown',handler);
    
    return ()=>{
      document.removeEventListener('mousedown',handler);
    }
  })

  const searchHandler=e=>{
    setSearch(e.target.value)
    setSuggestionList(getSuggestions(productsState.products,e.target.value))
  }
  const clearSearchHandler=e=>{
    setSearch('')
    setSuggestionList([])
  }

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
            {getCategories(productsState.products).map(category=><Link key={v4()} to={`/products?category=${category}`} onClick={()=>setOpenMenu(false)}>{category}</Link>)}
            <Link to='/products'onClick={()=>setOpenMenu(false)} >all categories</Link>
          </div>
        </div>  
      </div>

      <div className={styles.search} ref={searchRef} >
        <div className={styles.searchInput}>
          <input type="text" placeholder='What are you looking for...' value={search} onChange={searchHandler}/>
          <span className='material-icons'>search</span>
        </div>
        {(suggestionList.length > 0 ) && 
          <div className={styles.suggestions}>
            {suggestionList.map(item=> 
              <Link to={`/product/${item.id}`} key={item.id} className={styles.suggestion} onClick={clearSearchHandler}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
              </Link> 
            )}
          </div>
        }
        
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