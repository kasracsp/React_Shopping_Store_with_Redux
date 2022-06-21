import React,{useState,useRef,useEffect} from 'react'
import styles from './FilterCard.module.css'
import { getCategories } from '../helper/functions'
import { useSelector, useDispatch } from 'react-redux'
import { isInCategory } from '../helper/functions'
import { clearAllFilters, filterByCategory, filterByRate } from '../redux/filter/filterAction'
import CustomRange from './CustomRange'

const FilterCard = () => {
  const productsState=useSelector(state=>state.productsState)
  const filterState=useSelector(state=>state.filterState)
  const dispatch=useDispatch()
  const [openFilters,setOpenFilters]=useState(false)
  const filterRef=useRef()
  const [showCategory,setShowCategory]=useState(false)
  const [showRate,setShowRate]=useState(false)
  const [showPrice,setShowPrice]=useState(false)

  useEffect(()=>{
    let handler=(event)=>{
      if(filterRef.current && !filterRef.current.contains(event.target)){
        setOpenFilters(false)
      }
    }
    document.addEventListener('mousedown',handler);
    
    return ()=>{
      document.removeEventListener('mousedown',handler);
    }
  })

  return (
    <div className={styles.allFilters} ref={filterRef}>
      <div className={styles.allFiltersTitle} onClick={()=>setOpenFilters(!openFilters)} id={openFilters ? styles.show : ''}>
        <span className='material-icons'>tune</span>
        <p>All Filters</p>
        <span className="material-icons" id={styles.expand} >expand_more</span>
      </div>
      <div className={styles.filters} id={openFilters ? styles.show : ''}>
        <div className={styles.category}>
          <div className={styles.categoryTitle} onClick={()=>setShowCategory(!showCategory)}>
            <p>categories</p>
            <span className='material-icons'>{showCategory ? "remove" : "add"}</span>
          </div>
          <div className={styles.categoryItems} id={showCategory ? styles.show : ''}>
            {getCategories(productsState.products).map((category,index)=>
              <div key={index} className={styles.categoryItem}>
                <input type="checkbox" id={category} checked={isInCategory(filterState.category,category) ? true : false}
                onChange={()=>dispatch(filterByCategory(category))}
                />
                <label htmlFor={category}>{category}</label>
              </div>  
            )}
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.categoryTitle} onClick={()=>setShowRate(!showRate)}>
            <p>Customer Rating</p>
            <span className='material-icons'>{showRate ? "remove" : "add"}</span>
          </div>
          <div className={styles.ratingItems} id={showRate ? styles.show : ''}>
            {[1,2,3,4,5].map(item=>
              <span key={item}className='material-icons' 
              id={item<=filterState.rate ? styles.star : styles.grade}
              onClick={()=>dispatch(filterByRate(item))}
              >star</span>  
            )}
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.categoryTitle} onClick={()=>setShowPrice(!showPrice)}>
            <p>Price</p>
            <span className='material-icons'>{showPrice ? "remove" : "add"}</span>
          </div>
          <div className={styles.priceRange} id={showPrice ? styles.show : ''}>
            <CustomRange />
          </div>
        </div>
        <div className={styles.category}>
          <button className={styles.clearAll} onClick={()=>dispatch(clearAllFilters())} >Clear All</button>
        </div>
      </div>
    </div>
  )
}

export default FilterCard