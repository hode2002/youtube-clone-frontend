import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { VideoStore } from '@/types';

export const useVideoStore = create<VideoStore>()(
    immer((set) => ({
        videos: [],

        setVideos: (videos) => {
            set((state) => {
                state.videos = videos;
            });
        },
    })),
);
