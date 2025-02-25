import customAxios from '@/lib/axios';
import { Channel } from '@/types/channel';
import { CreateChannel } from '../types/channel';

const PREFIX = '/channels';

export const getUserChannel = async (userId: string): Promise<Channel> => {
    const res = await customAxios.get(`${PREFIX}/owner/${userId}`);
    return res.data.data;
};

export const createChannel = async (createChannel: CreateChannel): Promise<Channel> => {
    const res = await customAxios.post(`${PREFIX}`, createChannel);
    return res.data.data;
};

export const getByUniqueName = async (uniqueName: string): Promise<Channel> => {
    const res = await customAxios.get(`${PREFIX}/name/${uniqueName}`);
    return res.data.data;
};
