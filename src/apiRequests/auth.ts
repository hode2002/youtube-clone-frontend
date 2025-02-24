import customAxios from '@/lib/axios';

export const logout = async () => {
    try {
        await customAxios.post('/auth/logout');
    } catch (error) {
        console.log('Logout error:', error);
    }
};

export const refreshToken = async (): Promise<string | null> => {
    try {
        const res = await customAxios.post('/auth/refresh');

        const {
            data: { newAccessToken },
        } = res.data;

        return newAccessToken;
    } catch (error) {
        console.log(error);
        return null;
    }
};
