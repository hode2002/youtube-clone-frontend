import { getUserChannel } from '@/apiRequests';
import { useChannelStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';

export const useFetchChannel = (userId: string) => {
    const { channel, setChannel } = useChannelStore();

    return useQuery({
        queryKey: ['channel', userId],
        queryFn: async () => {
            const channel = await getUserChannel(userId);
            setChannel(channel);
            return channel;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        initialData: channel ?? null,
        enabled: !!userId,
    });
};
