import React from "react";
import './navbar.css';
import { useState } from "react";
function NavBar() {
    const [searchQuery, setSearchQuery] = useState('');
    
      return (
        <div className="App">
          {/* Header chính */}
          <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor: '#4A90E2'}}>
            <div className='container-fluid'>
              {/* Logo */}
              <a href="#" className='navbar-brand text-white fw-bold fs-4 ms-5 ps-5'>
                <i className="fas fa-laptop me-2"></i>
                HNDSHOP
              </a>
    
              {/* Thanh tìm kiếm */}
              <div className="flex-grow-1 mx-4">
                <div className="input-group" style={{maxWidth: '500px', margin: '0 auto'}}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Tìm máy tính, laptop, camera..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-light" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
    
              {/* Menu bên phải */}
              <div className="d-flex align-items-center">
                <a href="#" className="text-white text-decoration-none me-3 d-flex align-items-center">
                  <i className="fas fa-shopping-cart me-1"></i>
                  <span className="d-none d-md-inline">Giỏ Hàng</span>
                  <span className="badge bg-danger ms-1">0</span>
                </a>
                <a href="#" className="text-white text-decoration-none d-flex align-items-center">
                  <i className="fas fa-user me-1"></i>
                  <span className="d-none d-md-inline">Đăng Nhập/Đăng Ký</span>
                </a>
              </div>
            </div>
          </nav>
    
          {/* Menu danh mục sản phẩm */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle fw-bold text-primary" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="fas fa-list me-2"></i>
                      DANH MỤC SẢN PHẨM
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Máy tính để bàn</a></li>
                      <li><a className="dropdown-item" href="#">Laptop</a></li>
                      <li><a className="dropdown-item" href="#">Linh kiện PC</a></li>
                      <li><a className="dropdown-item" href="#">Camera</a></li>
                    </ul>
                  </li>
                  
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="fas fa-desktop me-1"></i>
                      Máy tính để bàn
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">PC Gaming</a></li>
                      <li><a className="dropdown-item" href="#">PC Văn phòng</a></li>
                      <li><a className="dropdown-item" href="#">PC Đồ họa</a></li>
                    </ul>
                  </li>
    
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="fas fa-laptop me-1"></i>
                      Laptop
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Gaming Laptop</a></li>
                      <li><a className="dropdown-item" href="#">Ultrabook</a></li>
                      <li><a className="dropdown-item" href="#">Workstation</a></li>
                    </ul>
                  </li>
    
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="fas fa-memory me-1"></i>
                      Linh kiện PC
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">CPU</a></li>
                      <li><a className="dropdown-item" href="#">VGA</a></li>
                      <li><a className="dropdown-item" href="#">RAM</a></li>
                      <li><a className="dropdown-item" href="#">Ổ cứng</a></li>
                      <li><a className="dropdown-item" href="#">Mainboard</a></li>
                    </ul>
                  </li>
    
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="fas fa-camera me-1"></i>
                      Camera
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Camera An ninh</a></li>
                      <li><a className="dropdown-item" href="#">Camera IP</a></li>
                      <li><a className="dropdown-item" href="#">Camera Wifi</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="fas fa-phone me-1"></i>
                      Liên Hệ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
}
export default NavBar;