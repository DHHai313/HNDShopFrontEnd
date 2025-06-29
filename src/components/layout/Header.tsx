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
                                    <li><Link className="dropdown-item" to="/category/2">Máy tính để bàn</Link></li>
                                    <li><Link className="dropdown-item" to="/category/4">Laptop</Link></li>
                                    <li><Link className="dropdown-item" to="/category/3">Linh kiện PC</Link></li>
                                    <li><Link className="dropdown-item" to="/category/1">Camera</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/category/2" role="button">
                                    <i className="fas fa-desktop me-1"></i>
                                    Máy tính để bàn
                                </Link>
                               
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/category/4" role="button">
                                    <i className="fas fa-laptop me-1"></i>
                                    Laptop
                                </Link>
                                <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/brand/Dell">Laptop Dell</Link></li>
                                <li><Link className="dropdown-item" to="/brand/Asus">Laptop Asus</Link></li>
                                <li><Link className="dropdown-item" to="/brand/Lenovo">Laptop Lenovo</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/category/3">
                                    <i className="fas fa-memory me-1"></i>
                                    Linh kiện 
                                </Link>
                                <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={`/brand/${encodeURIComponent("Chuột")}`}>Chuột</Link></li>
                                <li><Link className="dropdown-item" to={`/brand/${encodeURIComponent("Bàn phím")}`}>Bàn phím</Link></li>
                                <li><Link className="dropdown-item" to={`/brand/${encodeURIComponent("Tai nghe")}`}>Tai nghe</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/category/1" role="button">
                                    <i className="fas fa-camera me-1"></i>
                                    Camera
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/brand/Canon">Camera Canon</Link></li>
                                    <li><Link className="dropdown-item" to="/brand/EOS">Camera EOS</Link></li>
                                    <li><Link className="dropdown-item" to="/brand/Webcam">WebCam</Link></li>
                                    
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