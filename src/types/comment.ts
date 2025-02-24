import { User } from '@/types/user';
import { Video } from '@/types/video';

export type Comment = {
    _id: string;
    video: Video;
    user: User;
    content: string;
    parent?: Comment;
    likesCount: number;
    dislikesCount: number;
    repliesCount: number;
    createdAt: string;
    updatedAt: string;
};

export type CreateComment = {
    videoId: string;
    content: string;
    parentId?: string;
};
