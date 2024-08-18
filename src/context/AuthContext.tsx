import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined | boolean>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("authToken");
      const otp = localStorage.getItem("otpExpiration");
      const currentPath = location.pathname;

      if (!token && currentPath !== "/register") {
        navigate("/login");
      } else if (currentPath == "/verify" && !otp) {
        navigate("/login");
      } else if (token) {
        const expiryTime = localStorage.getItem("tokenExpiry");
        if (expiryTime && new Date().getTime() > parseInt(expiryTime)) {
          // Token has expired
          localStorage.removeItem("authToken");
          localStorage.removeItem("tokenExpiry");
          navigate("/login"); // Redirect to login page if the token has expired
        }
      }
      setLoading(false);
    };

    checkTokenExpiration();
  }, [navigate]);

  if (loading) {
    return <div className="loading loading-dots"></div>;
  }

  return (
    <AuthContext.Provider value={loading}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
