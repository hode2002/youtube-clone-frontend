import { Channel } from '@/types/channel';
import { User } from '@/types/user';

export type SubscriptionNotifyType = 'none' | 'all';

export type Subscription = {
    _id: string;
    channel: Channel;
    subscriber: User;
    notificationType: SubscriptionNotifyType;
    createdAt: string;
    updatedAt: string;
};

export type SubscriptionStore = {
    subscriptions: Subscription[];
    setSubscriptions: (subs: Subscription[]) => void;
    addSubscription: (sub: Subscription) => void;
    updateNotify: (newSub: Subscription) => void;
    removeSubscription: (channelId: string) => void;
    clearSubscription: () => void;
};
