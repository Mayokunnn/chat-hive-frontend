// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api';
import { LoginData } from '../../utils/types';
import { LoginResponse } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"

const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/login', loginData);
  return data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const responseData = data.data; // Accessing the data using key 0
      localStorage.setItem('authToken', responseData.token);
      localStorage.setItem('tokenExpiry', (Date.now() + responseData.expires_in * 1000).toString());
      localStorage.setItem('userId', responseData?.user?.id);
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${responseData.token}`;
      navigate('/');
    },
    onError: (data) => {
      const errorData = data?.response?.data
      console.log(errorData.status);
      if(errorData.status == 422){
        if(errorData.error[0].includes('You have tried too many times')){
          toast.error(`Try again in 30 minutes`);
        } else {
        toast.error(`${errorData.error[0] || ""}`);
      }    
    } else if(errorData.status == 400){
      toast.error(`Account not found`);
    }
    }
  });
};
