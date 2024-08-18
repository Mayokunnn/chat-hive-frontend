// src/hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api';
import { Error, RegisterData, RegisterResponse } from '../../utils/types'; // Corrected import path
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const registerUser = async (registerData: RegisterData): Promise<RegisterResponse> => {
  const { data } = await axiosInstance.post<RegisterResponse>('/register', registerData); // Changed endpoint to '/register'
  return data;
};



export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation( {
    mutationFn: registerUser,
    onSuccess: (data: RegisterResponse) => {
      const responseData = data.data; // Accessing the data using key 0
      console.log(responseData);
      localStorage.setItem('authToken', responseData.token);
      localStorage.setItem(
        "otpExpiration",
       responseData.otpExpiration
      );
      localStorage.setItem('tokenExpiry', (Date.now() + responseData.expires_in * 1000).toString());
      localStorage.setItem('userId', responseData?.user?.id);
      localStorage.setItem('userEmail', responseData?.user?.email);
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${responseData.token}`;
      navigate('/verify');
    },
    onError: (data: AxiosError) => {
      console.log(data.response?.data);
      const errorData : Error = data.response?.data;
      
      toast.error(errorData?.message)
    }
  });
};
