import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { SubscriptionStore } from '@/types';

export const useSubscriptionStore = create<SubscriptionStore>()(
    persist(
        immer((set) => ({
            subscriptions: [],
            setSubscriptions: (subs) =>
                set((state) => {
                    state.subscriptions = subs;
                }),
            addSubscription: (sub) =>
                set((state) => {
                    state.subscriptions.push(sub);
                }),
            updateNotify: (newSub) =>
                set((state) => {
                    const index = state.subscriptions.findIndex((sub) => sub._id === newSub._id);
                    if (index !== -1) state.subscriptions[index] = newSub;
                }),
            removeSubscription: (channelId) =>
                set((state) => {
                    state.subscriptions = state.subscriptions.filter(
                        (sub) => sub.channel._id !== channelId,
                    );
                }),
            clearSubscription: () =>
                set((state) => {
                    state.subscriptions = [];
                }),
        })),
        { name: 'subscriptions-storage' },
    ),
);
