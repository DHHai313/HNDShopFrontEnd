import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Nếu dùng React Router

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password
        };
        fetch(`http://localhost:8080/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginRequest)
        }).then(
            (respone) => {
                if(respone.ok){
                    return respone.json();
                }else {
                    throw new Error('Đăng nhập thất bại');
                }
            }
        ).then(
            (data) => {
                const {jwt} = data;
                localStorage.setItem('token',jwt)
                setError('Đăng nhập thành công');
            }
        ).catch(
            (error) => {
                setError('Đăng nhập thất bại!');
            }
        )
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Đăng Nhập</h3>
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Đăng Nhập</button>
                                </div>
                                {error && <div style={{color:"red"}}>{error}</div>}
                            </div>

                            {/* 👉 Thêm dòng đăng ký */}
                            <div className="text-center">
                                <span>Chưa có tài khoản? </span>
                                <Link to="/register">Đăng ký ngay</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
