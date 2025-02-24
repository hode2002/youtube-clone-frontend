import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore, useChannelStore, useUserStore } from '@/stores';
import { getUserChannel, getUserProfile } from '@/apiRequests';

export const useAuth = () => {
    const { accessToken } = useAuthStore();
    const { profile, setProfile } = useUserStore();
    const { channel, setChannel } = useChannelStore();

    const { data: profileData } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = await getUserProfile();
            setProfile(user);
            return user;
        },
        enabled: !!accessToken && !profile,
        staleTime: 1000 * 60 * 10,
        initialData: profile || undefined,
    });

    const { data: channelData } = useQuery({
        queryKey: ['channel'],
        queryFn: async () => {
            const channel = await getUserChannel(profile!._id);
            setChannel(channel);
            return channel;
        },
        enabled: !!accessToken && profile?.role === 'CHANNEL' && !!profile?.hasChannel && !channel,
        staleTime: 1000 * 60 * 10,
        initialData: channel || undefined,
    });

    useEffect(() => {
        if (profileData) {
            setProfile(profileData);
        }
    }, [profileData, setProfile]);

    useEffect(() => {
        if (channelData) {
            setChannel(channelData);
        }
    }, [channelData]);

    return {
        profile: profile || profileData,
        channel: channel || channelData,
    };
};
