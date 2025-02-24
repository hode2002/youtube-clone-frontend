import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSubscriptionStore } from '@/stores/subscription.store';
import {
    getUserSubscription,
    subscribeChannel,
    unsubscribeChannel,
    updateSubsNotificationType,
} from '@/apiRequests';
import { SubscriptionNotifyType } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export const useFetchSubscriptions = () => {
    const { setSubscriptions } = useSubscriptionStore();
    const { profile } = useAuth();

    return useQuery({
        queryKey: ['subscriptions', profile?._id],
        queryFn: async () => {
            const subs = await getUserSubscription();
            setSubscriptions(subs);
            return subs;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!profile?._id,
        select: (data) => data ?? [],
    });
};

export const useAddSubscription = () => {
    const queryClient = useQueryClient();
    const { addSubscription } = useSubscriptionStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: (channelId: string) => subscribeChannel(channelId),
        onSuccess: (newSub) => {
            addSubscription(newSub);
            queryClient.invalidateQueries({ queryKey: ['subscriptions', profile?._id] });
        },
    });
};

export const useRemoveSubscription = () => {
    const queryClient = useQueryClient();
    const { removeSubscription } = useSubscriptionStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: (channelId: string) => unsubscribeChannel(channelId),
        onSuccess: (channelId) => {
            removeSubscription(channelId);
            queryClient.invalidateQueries({ queryKey: ['subscriptions', profile?._id] });
        },
    });
};

export const useUpdateNotifySubscription = () => {
    const queryClient = useQueryClient();
    const { updateNotify } = useSubscriptionStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: ({ channelId, type }: { channelId: string; type: SubscriptionNotifyType }) =>
            updateSubsNotificationType(channelId, type),
        onSuccess: (newSub) => {
            updateNotify(newSub);
            queryClient.invalidateQueries({ queryKey: ['subscriptions', profile?._id] });
        },
    });
};
