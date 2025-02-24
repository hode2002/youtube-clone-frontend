import { User } from '@/types/user';

export type Channel = {
    _id: string;
    uniqueName: string;
    name: string;
    description: string;
    avatarUrl: string;
    banner: string;
    owner: User;
    subscribersCount: number;
    videosCount: number;
};

export type ChannelStore = {
    channel: Channel | null;
    setChannel: (channel: Channel) => void;
    updateAvatar: (avatar: string) => void;
    clearChannel: () => void;
};

export type CreateChannel = {
    uniqueName: string;
    name: string;
    owner: string;
    avatarUrl?: string;
};
