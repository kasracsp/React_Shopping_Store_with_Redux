import React,{useState,useRef,useEffect} from 'react'
import styles from './FilterCard.module.css'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import { sortBy } from '../redux/filter/filterAction'

const SortCard = () => {
  const filterState=useSelector(state=>state.filterState)
  const dispatch=useDispatch()
  const [openSort,setOpenSort]=useState(false)
  const sortRef=useRef()

  useEffect(()=>{
    let handler=(event)=>{
      if(sortRef.current && !sortRef.current.contains(event.target)){
        setOpenSort(false)
      }
    }
    document.addEventListener('mousedown',handler);
    
    return ()=>{
      document.removeEventListener('mousedown',handler);
    }
  })

  return (
    <div className={styles.allFilters} ref={sortRef}>
      <div className={styles.allFiltersTitle} onClick={()=>setOpenSort(!openSort)} id={openSort ? styles.show : ''}>
        <span className='material-icons'>sort</span>
        <p>Sort By</p>
        <span className="material-icons" id={styles.expand} >expand_more</span>
      </div>
      <div className={styles.filters} id={openSort ? styles.show : ''}>
        <div className={styles.sort}>
          <input type="radio" id='priceHigh' name='sort' checked={(filterState.sort==='price high') ? true : false} onChange={()=>dispatch(sortBy('price high'))}/>
          <label htmlFor="priceHigh">Price High</label>
        </div>
        <div className={styles.sort}>
          <input type="radio" id='priceLow' name='sort' checked={(filterState.sort==='price low') ? true : false} onChange={()=>dispatch(sortBy('price low'))}/>
          <label htmlFor="priceLow">Price Low</label>
        </div>
        <div className={styles.sort}>
          <input type="radio" id='bestRate' name='sort' checked={(filterState.sort==='best rate') ? true : false} onChange={()=>dispatch(sortBy('best rate'))}/>
          <label htmlFor="bestRate">Best Rate</label>
        </div>
      </div>
    </div>
  )
}

export default SortCard