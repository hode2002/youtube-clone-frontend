import customAxios from '@/lib/axios';
import { useAuthStore, useUserStore } from '@/stores';
import { User } from '@/types';

export const fetchUserData = async () => {
    try {
        const { setProfile } = useUserStore.getState();
        const { accessToken } = useAuthStore.getState();
        if (!accessToken) return;

        const { data } = await customAxios.get<User>('/users/profile');
        setProfile(data);
    } catch (error) {
        console.log(error);
    }
};
