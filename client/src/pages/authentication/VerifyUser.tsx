import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

const VerifyUser = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error("Token not found");
        navigate("/register");
        return;
      }

      try {
        const response = await api.get(`/verify-register/${token}`);
        if (response) {
          toast.success(response.data.message)
          navigate("/login");
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Verification failed. Try again!"
        );
        navigate("/register");
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mx-auto"></div>
        <p className="mt-4 font-semibold text-lg text-gray-700">
          Verifying your account...
        </p>
      </div>
    </div>
  );
};

export default VerifyUser;
