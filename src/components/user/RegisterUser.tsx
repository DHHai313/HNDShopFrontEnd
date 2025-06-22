import React, { useState } from "react";

function RegisterUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Báo lỗi
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorPhone, setErrorPhone] = useState('');

    // Xử lý submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        // Kiểm tra tất cả các field
        if (!username) {
            setErrorUsername("Vui lòng nhập tên đăng nhập");
            hasError = true;
        }
        if (!email) {
            setErrorEmail("Vui lòng nhập email");
            hasError = true;
        }
        if (!firstName) {
            setErrorFirstName("Vui lòng nhập tên");
            hasError = true;
        }
        if (!lastName) {
            setErrorLastName("Vui lòng nhập họ");
            hasError = true;
        }
        if (!phone) {
            setErrorPhone("Vui lòng nhập số điện thoại");
            hasError = true;
        }
        if (checkPassword(password)) hasError = true;
        if (checkConfirmPassword(confirmPassword)) hasError = true;

        if (hasError) return;

        // Gửi dữ liệu đến server
        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    password: password,
                    gender: gender,
                    address: "",             
                    shippingAddress: ""
                })
            });

            if (response.ok) {
                alert("Đăng ký thành công!");
                // Reset form
                setUsername('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
                setGender(1);
            } else {
                const error = await response.text();
                alert(`Đăng ký thất bại: ${error}`);
            }
        } catch (error) {
            console.log("Lỗi...", error);
            alert("Có lỗi xảy ra khi đăng ký");
        }
    };

    // Kiểm tra UserName
    const handleUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setUsername(inputValue);
        setErrorUsername('');

        if (!inputValue) {
            setErrorUsername("Vui lòng nhập tên đăng nhập");
            return;
        }

        const url = `http://localhost:8080/users/search/existsByUsername?username=${inputValue}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorUsername("Tên đăng nhập đã tồn tại");
            }
        } catch (error) {
            console.log("Lỗi...", error);
        }
    };

    // Kiểm tra Email
    const handleEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        setErrorEmail('');

        if (!inputValue) {
            setErrorEmail("Vui lòng nhập email");
            return;
        }

        const url = `http://localhost:8080/users/search/existsByEmail?email=${inputValue}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại");
            }
        } catch (error) {
            console.log("Lỗi...", error);
        }
    };

    // Kiểm tra FirstName
    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setFirstName(inputValue);
        setErrorFirstName(inputValue ? '' : "Vui lòng nhập tên");
    };

    // Kiểm tra LastName
    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setLastName(inputValue);
        setErrorLastName(inputValue ? '' : "Vui lòng nhập họ");
    };

    // Kiểm tra Phone
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setPhone(inputValue);
        const phoneRegex = /^[0-9]{10,11}$/;
        setErrorPhone(inputValue && !phoneRegex.test(inputValue) ? "Số điện thoại không hợp lệ" : '');
    };

    // Kiểm tra Gender
    const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(parseInt(e.target.value));
    };

    // Kiểm tra mật khẩu
    const checkPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword("Mật khẩu ít nhất 8 ký tự, gồm: chữ thường, chữ hoa, số");
            return true;
        } else {
            setErrorPassword('');
            return false;
        }
    };

    // Handle Mật khẩu
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setErrorPassword('');
        checkPassword(value);
        // Kiểm tra lại confirm password khi password thay đổi
        if (confirmPassword) {
            checkConfirmPassword(confirmPassword);
        }
    };

    // Kiểm tra ConfirmPassword
    const checkConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setErrorConfirmPassword("Mật khẩu chưa trùng khớp");
            return true;
        } else {
            setErrorConfirmPassword('');
            return false;
        }
    };

    // Handle ConfirmPassword
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrorConfirmPassword('');
        checkConfirmPassword(value);
    };

    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng Ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-lable">Tên đăng nhập</label>
                        <input 
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={handleUsername}
                        />
                        <div style={{color: "red"}}>{errorUsername}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-lable">Tên</label>
                        <input 
                            type="text"
                            id="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={handleFirstName}
                        />
                        <div style={{color: "red"}}>{errorFirstName}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-lable">Họ</label>
                        <input 
                            type="text"
                            id="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={handleLastName}
                        />
                        <div style={{color: "red"}}>{errorLastName}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-lable">Số điện thoại</label>
                        <input 
                            type="text"
                            id="phone"
                            className="form-control"
                            value={phone}
                            onChange={handlePhone}
                        />
                        <div style={{color: "red"}}>{errorPhone}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-lable">Giới tính</label>
                        <select
                            id="gender"
                            className="form-control"
                            value={gender}
                            onChange={handleGender}
                        >
                            <option value={1}>Nam</option>
                            <option value={0}>Nữ</option>
                        </select>
                    </div>
                    <div className="mb-3" style={{position: 'relative'}}>
                        <label htmlFor="password" className="form-lable">Mật khẩu</label>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={handlePassword}
                        />
                        <i 
                            className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} 
                            style={{position: 'absolute', right: '10px', top: '38px', cursor: 'pointer'}}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                        <div style={{color: "red"}}>{errorPassword}</div>
                    </div>
                    <div className="mb-3" style={{position: 'relative'}}>
                        <label htmlFor="confirmPassword" className="form-lable">Xác nhận mật khẩu</label>
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                        />
                        <i 
                            className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"} 
                            style={{position: 'absolute', right: '10px', top: '38px', cursor: 'pointer'}}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        ></i>
                        <div style={{color: "red"}}>{errorConfirmPassword}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-lable">Email</label>
                        <input 
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmail}
                        />
                        <div style={{color: "red"}}>{errorEmail}</div>
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;