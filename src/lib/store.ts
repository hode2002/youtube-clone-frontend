import { create } from 'zustand';

interface Video {
    id: number;
    title: string;
    channel: string;
    thumbnail: string;
}

interface VideoStore {
    videos: Video[];
    setVideos: (videos: Video[]) => void;
}

const useVideoStore = create<VideoStore>((set) => ({
    videos: [],
    setVideos: (videos) => set({ videos }),
}));

export default useVideoStore;
