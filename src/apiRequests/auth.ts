import customAxios from '@/lib/axios';
import { useAuthStore } from '@/stores';

export const logout = async () => {
    try {
        const { clearAuth, accessToken } = useAuthStore.getState();
        await customAxios.post('/auth/logout', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        });
        clearAuth();
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};
