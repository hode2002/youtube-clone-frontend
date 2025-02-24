import { Video } from '@/types/video';

export type WatchHistory = {
    _id: string;
    user: string;
    video: Video;
    watchedAt: string;
    createdAt: string;
    updatedAt: string;
};
