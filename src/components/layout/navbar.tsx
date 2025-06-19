import React, { ChangeEvent } from 'react';
import { KeyboardEvent } from 'react';
import './navbar.css';
import { useState } from 'react';
interface NavBarProps{
    searchQuery: string;
    setSearchQuery: (keyWord:string) => void;
}

function NavBar({searchQuery, setSearchQuery}: NavBarProps) {
    const [tempSearchQuery, setTempSearchQuery] = useState('');

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setTempSearchQuery(e.target.value);
    }
    const handleSearch = ()=>{
        setSearchQuery(tempSearchQuery);
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    return (
        <div className="App">
            {/* Header chính */}
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#4A90E2' }}>
                <div className="container-fluid">
                    {/* Logo */}
                    <a href="#" className="navbar-brand text-white fw-bold fs-4 ms-5 ps-5">
                        <i className="fas fa-laptop me-2"></i>
                        HNDSHOP
                    </a>

                    {/* Thanh tìm kiếm */}
                    <div className="flex-grow-1 mx-4">
                        <div className="input-group" style={{ maxWidth: '500px', margin: '0 auto' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm máy tính, laptop, camera..."
                                value={tempSearchQuery}
                                onChange={onSearchInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="btn btn-light" type="button" onClick={handleSearch}>
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
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-bold text-primary" href="#" role="button">
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
                                <a className="nav-link dropdown-toggle" href="#" role="button">
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
                                <a className="nav-link dropdown-toggle" href="#" role="button">
                                    <i className="fas fa-laptop me-1"></i>
                                    Laptop
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Laptop Dell</a></li>
                                    <li><a className="dropdown-item" href="#">Laptop Asus</a></li>
                                    <li><a className="dropdown-item" href="#">Laptop Lenovo</a></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button">
                                    <i className="fas fa-memory me-1"></i>
                                    Linh kiện 
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Chuột</a></li>
                                    <li><a className="dropdown-item" href="#">Bàn phím</a></li>
                                    <li><a className="dropdown-item" href="#">Tai nghe</a></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button">
                                    <i className="fas fa-camera me-1"></i>
                                    Camera
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Camera Canon</a></li>
                                    <li><a className="dropdown-item" href="#">Camera EOS</a></li>
                                    
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#footer">
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