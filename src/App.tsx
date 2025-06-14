import React, { useState } from 'react';
import './App.css';
import NavBar from './components/layout/navbar';
import Footer from './components/layout/Footer';
import Banner from './components/homepage/Banner';
import AdCarousel from './components/homepage/AdCarousel';
import ListProduct from './components/product/ListProduct';
import { getAllProduct } from './components/api/ProductAPI';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  getAllProduct().then().catch();
  return (
    <div className="App">
      <Banner />
      <NavBar />
      <AdCarousel />
      <ListProduct />
      <Footer />
    </div>
  );
}

export default App;