// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api';
import { LoginData } from '../../utils/types';
import { LoginResponse } from '../../utils/types';

const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/login', loginData);
  return data;
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('tokenExpiry', (Date.now() + data.expires_in * 1000).toString());
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.token}`;
    },
  });
};
