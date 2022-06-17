import React,{ useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

//react-redux
import { useDispatch, useSelector } from 'react-redux';
import fetchProducts from './redux/products/productsAction';
import fetchGeolocation from './redux/geolocation/geolocationAction';

//components
import Landing from './components/Landing';
import Products from './components/Products';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Loading from './components/Loading';


function App() {
  const dispatch=useDispatch()
  const productsState=useSelector(state=>state.productsState)

  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(fetchGeolocation())
  },[])

  return (
    
    <div className="App">
      {
      productsState.loading?
          <Loading />:
            productsState.error?
            <h1>{productsState.error}</h1>:
            <div>
              <Navbar />
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/products' element={<Products />} />
                <Route path='/*' element={<Navigate to='/' />} />
              </Routes>
              <Footer />
            </div>
      }
    </div>  
  );
}

export default App;
