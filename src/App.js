import React,{ useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

//react-redux
import { useDispatch } from 'react-redux';
import fetchProducts from './redux/products/productsAction';
import fetchGeolocation from './redux/geolocation/geolocationAction';

//components
import Landing from './components/Landing';
import Products from './components/Products';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';


function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(fetchGeolocation())
  },[])

  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/products' element={<Products />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
        <Footer />
      </div>  
  );
}

export default App;
