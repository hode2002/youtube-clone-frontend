import { AuthStore } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        immer<AuthStore>((set) => ({
            accessToken: null,

            setAccessToken: (token) =>
                set((state) => {
                    state.accessToken = token;
                }),

            clearAuth: () =>
                set((state) => {
                    state.accessToken = null;
                }),
        })),
        { name: 'auth-storage' },
    ),
);
