import React,{ useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

//react-redux
import { useDispatch, useSelector } from 'react-redux';
import fetchProducts from './redux/products/productsAction';
import fetchGeolocation from './redux/geolocation/geolocationAction';
import { setOrders } from './redux/orders/ordersAction';

//components
import Landing from './pages/Landing';
import Products from './pages/Products';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Loading from './pages/Loading';
import Product from './pages/Product';
import ErrorPage from './pages/ErrorPage';
import Purchase from './pages/Purchase';


function App() {
  const dispatch=useDispatch()
  const productsState=useSelector(state=>state.productsState)

  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(fetchGeolocation())
    dispatch(setOrders())
  },[])

  return (
    
    <div className="App">
      {
      productsState.loading?
          <Loading />:
            productsState.error?
            <ErrorPage error={productsState.error}/>:
            <div>
              <Navbar />
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/products' element={<Products />} />
                <Route path='/product/:id' element={<Product />} />
                <Route path='/*' element={<Navigate to='/' />} />
                <Route path='/purchase' element={<Purchase />} />
              </Routes>
              <Footer />
            </div>
      }
    </div>  
  );
}

export default App;
