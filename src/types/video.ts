import { Channel } from '@/types/channel';

export type VideoPrivacy = 'public' | 'private';

export type VideoStatus = 'draft' | 'published' | 'processing';

export type Video = {
    _id: string;
    title: string;
    videoId: string;
    description: string;
    url: string;
    thumbnail: string;
    duration: number;
    viewsCount: number;
    likesCount: number;
    dislikesCount: number;
    commentsCount: number;
    privacy: VideoPrivacy;
    status: VideoStatus;
    publishedAt: string;
    category: string;
    channel: Channel;
    createdAt: string;
    updatedAt: string;
};

export type VideoStore = {
    videos: Video[];
    setVideos: (videos: Video[]) => void;
};

export type CreateVideo = {
    title: string;
    channel: string;
    url: string;
    videoId: string;
    category: string;
};

export type UpdateVideo = {
    title?: string;
    description?: string;
    thumbnail?: string;
    privacy?: VideoPrivacy;
    category?: string;
};
