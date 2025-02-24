import { Video } from '@/types/video';

export type LikeDislike = {
    _id: string;
    target: Video;
    targetType: 'video' | 'comment';
    user: string;
    type: 'like' | 'dislike';
    createdAt: string;
    updatedAt: string;
};
