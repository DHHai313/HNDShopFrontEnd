import React, { useState } from 'react';
import './App.css';
import NavBar from './components/layout/navbar';
import Footer from './components/layout/Footer';
import Banner from './components/homepage/Banner';
import AdCarousel from './components/homepage/AdCarousel';
import ListProduct from './components/product/ListProduct';
import { getAllProduct } from './components/api/ProductAPI';
// index.tsx hoặc App.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ⬅️ Rất quan trọng: để Carousel hoạt động

function App() {
  // const [searchQuery, setSearchQuery] = useState('');
  
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