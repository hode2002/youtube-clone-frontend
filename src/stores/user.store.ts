import { UserStore } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useUserStore = create<UserStore>()(
    immer((set) => ({
        profile: null,
        setProfile: (profile) => {
            set(() => ({
                profile,
            }));
        },
        updateAvatar: (avatar) =>
            set((state) => ({
                profile: state.profile ? { ...state.profile, avatar } : null,
            })),
        removeProfile: () => {
            set(() => ({
                profile: null,
            }));
        },
    })),
);
