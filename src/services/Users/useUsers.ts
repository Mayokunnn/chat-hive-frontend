// src/hooks/useRegister.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api';
import { UserResource, UsersData} from '../../utils/types'; // Corrected import path

const fetchUsers = async (): Promise<UserResource[]> => {
  const { data } = await axiosInstance.get<UsersData>(`/users`); // Changed endpoint to '/register'
  return data.data;
};



export const useUsers = () => {
  return useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ['users' ],
    enabled: true,
    staleTime: 120
  });
};
