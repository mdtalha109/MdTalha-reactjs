import React from 'react';
import './App.css';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import ProductDetail from './pages/productDetail/ProductDetail';
import CreateProduct from './pages/createProduct/CreateProduct';

function App() {
  return (
    <div className="App">
     
      <Header/>
       <Routes>
            <Route path="/" element={<Homepage/>}> </Route>
            <Route path="/product/:id" element={<ProductDetail/>}> </Route>
            <Route path="/create" element={<CreateProduct/>}> </Route>
          </Routes>
    
    </div>
  );
}

export default App;
