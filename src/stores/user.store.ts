import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { UserStore } from '@/types/user';

export const useUserStore = create(
    persist(
        immer<UserStore>((set) => ({
            profile: null,

            setProfile: (profile) => {
                set((state) => {
                    state.profile = profile;
                });
            },

            updateAvatar: (avatar) => {
                set((state) => {
                    if (state.profile) state.profile.avatarUrl = avatar;
                });
            },

            removeProfile: () => {
                set((state) => {
                    state.profile = null;
                });
            },
        })),
        { name: 'user-storage' },
    ),
);
