import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

function EnableAccount() {
    const [email, setEmail] = useState('');
    const [enableCode, setEnableCode] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [notification, setNotification] = useState('');

    const { email: emailParam, enableCode: enableCodeParam } = useParams<{ email: string; enableCode: string }>();

    useEffect(() => {
        if (emailParam && enableCodeParam) {
            setEmail(emailParam);
            setEnableCode(enableCodeParam);
            doEnable(emailParam, enableCodeParam);
        } else {
            setNotification("Liên kết kích hoạt không hợp lệ.");
        }
    }, [emailParam, enableCodeParam]);

    const doEnable = async (email: string, code: string) => {
        try {
            const url = `http://localhost:8080/users/enable?email=${encodeURIComponent(email)}&enableCode=${encodeURIComponent(code)}`;
            const response = await fetch(url, {
                method: "GET",
            });
            if (response.ok) {
                setEnabled(true);
            } else {
                const errorText = await response.text();
                setNotification(errorText || "Kích hoạt thất bại.");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            setNotification("Có lỗi xảy ra khi kích hoạt tài khoản.");
        }
    };

    return (
        <div>
            <h1>Kích hoạt tài khoản</h1>
            {enabled ? (
                <p>Tài khoản đã được kích hoạt.</p>
            ) : (
                <p style={{ color: "red" }}>({notification})</p>
            )}
        </div>
    );
}

export default EnableAccount;