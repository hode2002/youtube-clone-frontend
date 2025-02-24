import customAxios from '@/lib/axios';
import { Video } from '@/types';
import { Subscription, SubscriptionNotifyType } from '@/types/subscription';

const PREFIX = '/subscriptions';

export const getUserSubscription = async (): Promise<Subscription[]> => {
    const res = await customAxios.get(PREFIX);
    return res.data.data;
};

export const checkSubscription = async (channelId: string): Promise<Subscription> => {
    const res = await customAxios.get(`${PREFIX}/check?channelId=${channelId}`);
    return res.data.data;
};

export const getSubscribedVideos = async (): Promise<Video[]> => {
    const res = await customAxios.get(`${PREFIX}/videos`);
    return res.data.data;
};

export const subscribeChannel = async (channelId: string): Promise<Subscription> => {
    const res = await customAxios.post('${PREFIX}', { channelId });
    return res.data.data;
};

export const unsubscribeChannel = async (channelId: string): Promise<string> => {
    await customAxios.delete(`${PREFIX}/${channelId}`);
    return channelId;
};

export const updateSubsNotificationType = async (
    channelId: string,
    notificationType: SubscriptionNotifyType,
): Promise<Subscription> => {
    const res = await customAxios.patch(`${PREFIX}/channel/${channelId}`, {
        notificationType,
    });

    return res.data.data;
};
