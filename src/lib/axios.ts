import { useAuthStore } from '@/stores';
import { SuccessResponse } from '@/types/response';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const customAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

customAxios.interceptors.request.use(
    async (config) => {
        const { accessToken } = useAuthStore.getState();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (
            error instanceof AxiosError &&
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const { setAccessToken } = useAuthStore.getState();

                const res = await axios.post(
                    process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/refresh',
                    {},
                    {
                        withCredentials: true,
                    },
                );

                const {
                    data: { newAccessToken },
                } = res.data;
                setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return customAxios<SuccessResponse>(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failure: ', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default customAxios;
