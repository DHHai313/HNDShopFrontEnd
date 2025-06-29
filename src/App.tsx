import React, { useState } from 'react';
import './App.css';
import NavBar from './components/layout/navbar';
import Footer from './components/layout/Footer';
import Banner from './components/homepage/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/admin/admin';
import HomePage from './components/homepage/HomePage';
import RegisterUser from './components/user/RegisterUser';
import EnableAccount from './components/user/EnableAccount';
import Login from './components/login/Login';
import Test from './components/user/Test';
import { AuthProvider } from './context/AuthContext'; // Nhập AuthProvider

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Banner />
          <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Routes>
            <Route path="/brand/:brandName" element={<HomePage key={window.location.pathname} searchQuery={searchQuery} />} />
            <Route path="/category/:categoryId" element={<HomePage key={window.location.pathname} searchQuery={searchQuery} />} />
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/enable/:email/:enableCode" element={<EnableAccount />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;