import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const Test = ()=>{
    const [username, setUsername] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if (token) {
            const userData =  jwtDecode(token);
            console.log(userData);
            if (userData) {
                setUsername(userData.sub+'');
            }
        }
    },[]);

    return (
        <div>
            {username && <div>Xin chao,{username}</div>}
        </div>
    );
}
export default Test;