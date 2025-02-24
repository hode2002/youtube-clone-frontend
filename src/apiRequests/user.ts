import customAxios from '@/lib/axios';
import { User } from '@/types/user';

export const getUserProfile = async (): Promise<User> => {
    const res = await customAxios.get('/users/profile');
    return res.data.data;
};
