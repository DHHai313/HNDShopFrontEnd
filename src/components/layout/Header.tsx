import React from "react";
import { Link } from "react-router-dom";
function HeaderList(){
    return(
       
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
                                <Link className="nav-link dropdown-toggle fw-bold text-primary" to="/" role="button">
                                    <i className="fas fa-list me-2"></i>
                                    DANH MỤC SẢN PHẨM
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/2">Máy tính để bàn</Link></li>
                                    <li><Link className="dropdown-item" to="/4">Laptop</Link></li>
                                    <li><Link className="dropdown-item" to="/3">Linh kiện PC</Link></li>
                                    <li><Link className="dropdown-item" to="/1">Camera</Link></li>
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
    );
    
}
export default HeaderList;