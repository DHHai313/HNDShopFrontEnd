// src/components/RequireAdmin.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  authorities: string[];
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.authorities?.includes("ADMIN")) {
          navigate("/login");
        } else {
          setAuthorized(true);
        }
      } catch (error) {
        console.error("Token decode failed:", error);
        navigate("/login");
      }
    }, [navigate]);

    if (authorized === null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAdminCheck;
};

export default RequireAdmin;