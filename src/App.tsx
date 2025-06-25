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
import HomePage from './components/homepage/HomePage';
import RegisterUser from './components/user/RegisterUser';
import EnableAccount from './components/user/EnableAccount';
import Login from './components/login/Login';
import Test from './components/user/Test';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    
      <div className="App">
       <Router>
          <Banner />
           <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <Routes>
          <Route path="/brand/:brandName" element={<HomePage key={window.location.pathname} searchQuery={searchQuery} />} />
          <Route path="/category/:categoryId" element={<HomePage key={window.location.pathname} searchQuery={searchQuery} />} />
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path='/enable/:email/:enableCode' element={<EnableAccount />}></Route>
        </Routes>


        <Footer />
       </Router>
        
      </div>
    
    
  );
}

export default App;