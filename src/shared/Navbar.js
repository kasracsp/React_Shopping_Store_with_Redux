import React,{ useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCategories, getSuggestions } from '../helper/functions'
import { AuthContext } from "../context/AuthContextProvider";

//styles
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user, logOut }=useContext(AuthContext);
  const productsState=useSelector(state=>state.productsState)
  const ordersState=useSelector(state=>state.ordersState)
  const [openMenu,setOpenMenu]=useState(false)
  const [search,setSearch]=useState('')
  const [suggestionList,setSuggestionList]=useState([])
  const [openSearch,setOpenSearch]=useState(false)
  const searchRef=useRef()

  useEffect(()=>{
    let searchHandler=(event)=>{
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setSuggestionList([])
      }
    }
    document.addEventListener('mousedown',searchHandler);
    
    return ()=>{
      document.removeEventListener('mousedown',searchHandler);
    }
  })

  const searchHandler=e=>{
    setSearch(e.target.value)
    setSuggestionList(getSuggestions(productsState.products,e.target.value))
  }
  const clearSearchHandler=e=>{
    setSearch('')
    setSuggestionList([])
    setOpenSearch(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftNav}>
        <Link to="/">
          <img
            src="https://live.staticflickr.com/65535/52189316838_8a83683d14_b.jpg"
            alt="logo"
          />
        </Link>
        <div className={styles.categoriesContainer}>
          <div to="/products" className={styles.categoriesTitle}>
            <span className="material-icons">list</span>
            <p>categories</p>
            <span className="material-icons" id={styles.expand}>
              expand_more
            </span>
          </div>
          <div className={styles.categories} id={openMenu ? styles.show : ""}>
            {getCategories(productsState.products).map((category, index) => (
              <Link
                to={`/products?category=${category}`}
                onClick={() => setOpenMenu(false)}
                key={index}
              >
                {category}
              </Link>
            ))}
            <Link to="/products" onClick={() => setOpenMenu(false)}>
              all categories
            </Link>
          </div>
        </div>
      </div>

      <div
        className={styles.search}
        ref={searchRef}
        id={openSearch ? styles.show : ""}
      >
        <div className={styles.searchInput}>
          <span
            className="material-icons"
            id={openSearch ? styles.show : styles.hidden}
            onClick={clearSearchHandler}
          >
            keyboard_backspace
          </span>
          <input
            type="text"
            placeholder="What are you looking for..."
            value={search}
            onChange={searchHandler}
          />
          <span className="material-icons">search</span>
        </div>
        {suggestionList.length > 0 && (
          <div className={styles.suggestions}>
            {suggestionList.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className={styles.suggestion}
                onClick={clearSearchHandler}
              >
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className={styles.rigthNav}>
        <Link to="/" className={styles.menu} id={styles.home}>
          <span className="material-icons">home</span>
          <p className={styles.menuTitle}>home</p>
        </Link>
        <div
          className={styles.menu}
          onClick={() => setOpenSearch(true)}
          id={styles.searchIcon}
        >
          <span className="material-icons">search</span>
          <p className={styles.menuTitle}>search</p>
        </div>
        {user ? (
          <div className={styles.menu}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" />
            ) : (
              <span className="material-icons">account_circle</span>
            )}
            {user.displayName ? (
              <p className={styles.menuTitle}>{user.displayName}</p>
            ) : (
              <p className={styles.menuTitle}>My Account</p>
            )}
            <div className={styles.userOptions}>
              <Link to="/profile/userdetails" className={styles.userOption}>
                Profile
              </Link>
              <button onClick={() => logOut()} className={styles.userOption}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/signin" className={styles.menu}>
            <span className="material-icons">account_circle</span>
            <p className={styles.menuTitle}>sign in</p>
          </Link>
        )}
        <Link to="/purchase" className={styles.menu}>
          <div className={styles.shopping}>
            <span className="material-icons">shopping_cart</span>
            <p className={styles.counter}>{ordersState.totalItems}</p>
          </div>
          <p className={styles.menuTitle}>cart</p>
        </Link>
      </div>

      <div className={styles.menuBurger} onClick={() => setOpenMenu(!openMenu)}>
        <div className={styles.burger} id={openMenu ? styles.show : ""}></div>
      </div>
    </div>
  );
}

export default Navbar