import React,{ useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

//react-redux
import { useDispatch } from 'react-redux';
import fetchProducts from './redux/products/productsAction';

//components
import Landing from './components/Landing';
import Products from './components/Products';


function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/products' element={<Products />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>  
  );
}

export default App;
