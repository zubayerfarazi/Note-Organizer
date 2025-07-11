import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  // @ts-ignore
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useAuth();

  const checkAuth = async () => {
    try {
      const response = await api.get("/me");
      setUser(response?.data?.user)
      setAuthorized(true);
    } catch (error: any) {
      if (error.response?.status === 401 && error.response?.data?.message.includes("expired")) {
        try {
          await api.post("/refresh-token");
          await api.get("/me");
          setAuthorized(true);
        } catch (refreshError) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

   if (authorized === null) {
    return <div>Loading...</div>;
  }

  return authorized ? <Outlet /> : null;
};

export default PrivateRoute;
