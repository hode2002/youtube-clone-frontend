import { Video } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface VideoStore {
    videos: Video[];
    setVideos: (videos: Video[]) => void;
}

export const useVideoStore = create<VideoStore>()(
    immer((set) => ({
        videos: [],
        setVideos: (videos) => set({ videos }),
    })),
);
