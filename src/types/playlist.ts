import { Video } from '@/types/video';

export type PlaylistVisibility = 'private' | 'public';

export type Playlist = {
    _id: string;
    title: string;
    description: string;
    visibility: PlaylistVisibility;
    thumbnail: string;
    owner: string;
    videos: Video[];
    removable: boolean;
};

export type PlaylistStore = {
    playlists: Playlist[];
    setPlaylists: (playlists: Playlist[]) => void;
    addPlaylist: (playlist: Playlist) => void;
    editPlaylist: (playlist: Playlist) => void;
    removePlaylist: (playlistId: string) => void;
};

export type CreatePlaylist = {
    title: string;
    visibility?: string;
};

export type UpdatePlaylist = {
    title?: string;
    videoId?: string;
    visibility?: string;
    description?: string;
};
