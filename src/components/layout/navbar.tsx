import React, { ChangeEvent } from 'react';
import { KeyboardEvent } from 'react';
import './navbar.css';
import { useState } from 'react';
import HeaderList from './Header';
import { Link } from 'react-router-dom';
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
                    <Link to="/" className="navbar-brand text-white fw-bold fs-4 ms-5 ps-5">
                        <i className="fas fa-laptop me-2"></i>
                        HNDSHOP
                    </Link>

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
                        <a href="/login" className="text-white text-decoration-none d-flex align-items-center">
                            <i className="fas fa-user me-1"></i>
                            <span className="d-none d-md-inline">Đăng Nhập/Đăng Ký</span>
                        </a>
                    </div>
                </div>
            </nav>
           <HeaderList/>
            
        </div>
    );
}

export default NavBar;