import React,{ useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import styles from './Products.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { filterProducts } from '../helper/filterFunction';
import { filterByCategory, clearAllFilters } from '../redux/filter/filterAction';

//components
import Card from '../shared/Card'
import FilterCard from '../components/FilterCard'
import SortCard from '../components/SortCard';

const Products = () => {
  const location=useLocation()
  const productsState=useSelector(state=>state.productsState)
  const filterState=useSelector(state=>state.filterState)
  const dispatch=useDispatch()
  
  useEffect(()=>{
    dispatch(clearAllFilters())
    if(queryString.parse(location.search).category){
      const locationCategory=queryString.parse(location.search)
      dispatch(filterByCategory(locationCategory.category))
    }
    window.scrollTo({
      top: 0,
    })
  },[location])

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <FilterCard />
        <SortCard />
      </div>
      <div className={styles.productsSection}>
        {filterProducts(productsState.products,filterState).map(product=><Card key={product.id} product={product} isShow={true}/>)}
      </div>
    </div>
  )
}

export default Products