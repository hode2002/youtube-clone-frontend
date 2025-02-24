import customAxios from '@/lib/axios';
import { useAuthStore } from '@/stores';
import { LikeDislike } from '@/types/like-dislike';

const { accessToken } = useAuthStore.getState();
const PREFIX = '/like-dislike';

export const checkUserLiked = async (
    targetType: string,
    targetId: string,
): Promise<LikeDislike | null> => {
    if (!accessToken) return null;

    try {
        if (!targetType || !targetId) return null;
        const res = await customAxios.get(
            `${PREFIX}?targetType=${targetType}&targetId=${targetId}`,
        );
        return res.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLikedVideos = async (): Promise<LikeDislike[]> => {
    const res = await customAxios.get(`${PREFIX}/videos/like`);
    return res.data.data;
};

export const like = async (targetType: string, targetId: string) => {
    try {
        if (!targetType || !targetId) return;
        await customAxios.post(`${PREFIX}/like`, {
            targetType,
            targetId,
        });
    } catch (error) {
        console.log(error);
    }
};

export const removeLike = async (targetType: string, targetId: string) => {
    try {
        if (!targetType || !targetId) return;
        await customAxios.post(`${PREFIX}/remove-like`, {
            targetType,
            targetId,
        });
    } catch (error) {
        console.log(error);
    }
};

export const dislike = async (targetType: string, targetId: string) => {
    try {
        if (!targetType || !targetId) return;
        await customAxios.post(`${PREFIX}/dislike`, {
            targetType,
            targetId,
        });
    } catch (error) {
        console.log(error);
    }
};

export const removeDislike = async (targetType: string, targetId: string) => {
    try {
        if (!targetType || !targetId) return;
        await customAxios.post(`${PREFIX}/remove-dislike`, {
            targetType,
            targetId,
        });
    } catch (error) {
        console.log(error);
    }
};
