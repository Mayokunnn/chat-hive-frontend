import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Assuming the token contains an expiration time (you may need to decode it to check expiration)
        const expiryTime = localStorage.getItem('tokenExpiry');
        if (expiryTime && new Date().getTime() > parseInt(expiryTime)) {
          // Token has expired
          localStorage.removeItem('authToken');
          localStorage.removeItem('tokenExpiry');
          navigate('/login'); // Redirect to login page
        }
      }
      if(!token) navigate('login');
      setLoading(false);
    };

    checkTokenExpiration();
  }, [navigate]);

  return {loading};
};
