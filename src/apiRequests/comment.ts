import customAxios from '@/lib/axios';
import { Comment, CreateComment } from '@/types';

const PREFIX = '/comments';

export const createComment = async (createComment: CreateComment): Promise<Comment> => {
    const res = await customAxios.post(PREFIX, createComment);
    return res.data.data;
};

export const createReply = async (createComment: CreateComment): Promise<Comment> => {
    const res = await customAxios.post(`${PREFIX}/reply`, createComment);
    return res.data.data;
};

export const getVideoComments = async (videoId: string): Promise<Comment[]> => {
    const res = await customAxios.get(`${PREFIX}/${videoId}`);
    return res.data.data;
};

export const getCommentReplies = async (commentId: string): Promise<Comment[]> => {
    const res = await customAxios.get(`${PREFIX}/replies/${commentId}`);
    return res.data.data;
};

export const updateComment = async (commentId: string, content: string): Promise<Comment> => {
    const res = await customAxios.patch(`${PREFIX}/${commentId}`, { content });
    return res.data.data;
};

export const deleteComment = async (commentId: string): Promise<{ success: boolean }> => {
    const res = await customAxios.delete(`${PREFIX}/${commentId}`);
    return res.data.data;
};
