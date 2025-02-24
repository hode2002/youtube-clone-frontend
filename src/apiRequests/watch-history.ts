import customAxios from '@/lib/axios';
import { WatchHistory } from '@/types/watch-history';

export const addToWatchHistory = async (videoId: string): Promise<boolean> => {
    try {
        await customAxios.post(`/watch-history`, {
            videoId,
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getWatchHistory = async (): Promise<WatchHistory[]> => {
    try {
        const res = await customAxios.get(`/watch-history`);
        return res.data.data;
    } catch (error) {
        return [];
    }
};

export const removeFromWatchHistory = async (videoId: string): Promise<boolean> => {
    try {
        await customAxios.delete(`/watch-history/${videoId}`);
        return true;
    } catch (error) {
        return false;
    }
};
