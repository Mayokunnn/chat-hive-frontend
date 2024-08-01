// src/hooks/useRegister.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api';
import { UserData} from '../../utils/types'; // Corrected import path

const fetchUser = async (id: string): Promise<UserData> => {
  const { data } = await axiosInstance.get<UserData>(`/users/${id}`); // Changed endpoint to '/register'
  return data;
};



export const useUser = (id: string) => {
  return useQuery({
    queryFn: () => fetchUser(id),
    queryKey: ['user', id],
    enabled: true,
    staleTime: 60
  });
};
