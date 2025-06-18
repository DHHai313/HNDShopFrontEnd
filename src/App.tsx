import React, { useState } from 'react';
import './App.css';
import NavBar from './components/layout/navbar';
import Footer from './components/layout/Footer';
import Banner from './components/homepage/Banner';
import AdCarousel from './components/homepage/AdCarousel';
import ListProduct from './components/product/ListProduct';
import { getAllProduct } from './components/api/ProductAPI';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Đúng, cần cho Carousel
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/admin/admin';


function App() {
  // const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="App">
        {/* Các thành phần chung hiển thị trên mọi trang */}
        <Banner />
        <NavBar />
        {/* Routes để điều hướng các trang */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AdCarousel />
                <ListProduct />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;