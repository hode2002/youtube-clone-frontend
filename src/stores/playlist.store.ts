import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { PlaylistStore } from '@/types';

export const usePlaylistStore = create<PlaylistStore>()(
    immer((set) => ({
        playlists: [],

        setPlaylists: (playlists) =>
            set((state) => {
                state.playlists = playlists;
            }),

        addPlaylist: (playlist) =>
            set((state) => {
                state.playlists.push(playlist);
            }),

        editPlaylist: (playlist) =>
            set((state) => {
                const index = state.playlists.findIndex((p) => p._id === playlist._id);
                if (index !== -1) state.playlists[index] = playlist;
            }),

        removePlaylist: (playlistId) =>
            set((state) => {
                state.playlists = state.playlists.filter((p) => p._id !== playlistId);
            }),
    })),
);
