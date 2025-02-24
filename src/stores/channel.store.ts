import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ChannelStore } from '@/types/channel';

export const useChannelStore = create(
    persist(
        immer<ChannelStore>((set) => ({
            channel: null,

            setChannel: (channel) => {
                set((state) => {
                    state.channel = channel;
                });
            },

            updateAvatar: (avatar) => {
                set((state) => {
                    if (state.channel) state.channel.avatarUrl = avatar;
                });
            },

            clearChannel: () => {
                set((state) => {
                    state.channel = null;
                });
            },
        })),
        { name: 'channel-storage' },
    ),
);
