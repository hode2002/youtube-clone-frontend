import customAxios from '@/lib/axios';
import { Video, CreateVideo, UpdateVideo } from '@/types/video';
import { Channel } from '@/types/channel';

const PREFIX = '/videos';

export const createVideo = async (data: CreateVideo): Promise<Video | null> => {
    try {
        const res = await customAxios.post(PREFIX, data);
        return res.data.data;
    } catch (error) {
        console.error('Failed to create video:', error);
        return null;
    }
};

export const updateVideo = async (id: string, data: UpdateVideo): Promise<Video | null> => {
    try {
        const res = await customAxios.patch(`${PREFIX}/${id}`, data);
        return res.data.data;
    } catch (error) {
        console.error('Failed to update video:', error);
        return null;
    }
};

export const getVideoForOwner = async (): Promise<Video[]> => {
    try {
        const res = await customAxios.get(`${PREFIX}/channel/owner`);
        return res.data.data;
    } catch (error) {
        console.error("Failed to fetch owner's videos:", error);
        return [];
    }
};

export const getVideoByChannel = async (uniqueName: string): Promise<Video[]> => {
    const res = await customAxios.get(`${PREFIX}/channel/${uniqueName}`);
    return res.data.data;
};

export const getVideosByCategory = async (category: string): Promise<Video[]> => {
    try {
        const res = await customAxios.get(`${PREFIX}/category/${category}`);
        return res.data.data;
    } catch (error) {
        console.error(`Failed to fetch videos for category ${category}:`, error);
        return [];
    }
};

export const getVideoById = async (videoId: string): Promise<Video | null> => {
    try {
        if (!videoId) return null;
        const res = await customAxios.get(`${PREFIX}/${videoId}`);
        return res.data.data;
    } catch (error) {
        console.error(`Failed to fetch video with ID ${videoId}:`, error);
        return null;
    }
};

export const getVideosByKeyword = async (
    keyword: string,
): Promise<{ videos: Video[]; channels: Channel[] } | null> => {
    try {
        if (!keyword) return null;
        const res = await customAxios.get(`/search?q=${keyword}`);
        return res.data.data;
    } catch (error) {
        console.error(`Failed to search videos for keyword ${keyword}:`, error);
        return null;
    }
};

export const increaseViewByVideoId = async (videoId: string): Promise<void> => {
    try {
        if (!videoId) return;
        await customAxios.post(`${PREFIX}/${videoId}/view`);
    } catch (error) {
        console.error(`Failed to increase views for video ID ${videoId}:`, error);
    }
};

export const checkVideoStatus = async (
    videoId: string,
): Promise<{ url: string; secure_url: string }> => {
    try {
        const res = await customAxios.post(`/media/${videoId}/status`);
        return res.data.data;
    } catch (error) {
        console.error(`Failed to check video status for ID ${videoId}:`, error);
        return { url: '', secure_url: '' };
    }
};
