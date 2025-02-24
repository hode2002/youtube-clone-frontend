import customAxios from '@/lib/axios';
import { Playlist, CreatePlaylist, UpdatePlaylist } from '@/types';

const PREFIX = '/playlist';

export const getUserPlaylists = async (): Promise<Playlist[]> => {
    const res = await customAxios.get(`${PREFIX}/me`);
    return res.data.data;
};

export const gePlaylistById = async (id: string): Promise<Playlist> => {
    const res = await customAxios.get(`${PREFIX}/${id}`);
    return res.data.data;
};

export const createPlaylist = async (playlist: CreatePlaylist): Promise<Playlist> => {
    const res = await customAxios.post(PREFIX, playlist);
    return res.data.data;
};

export const updatePlaylist = async (id: string, playlist: UpdatePlaylist): Promise<Playlist> => {
    const res = await customAxios.patch(`${PREFIX}/${id}`, playlist);
    return res.data.data;
};

export const addVideoToPlaylist = async (
    playlistId: string,
    videoId: string,
): Promise<Playlist> => {
    const res = await customAxios.post(`${PREFIX}/${playlistId}/add-video`, { videoId });
    return res.data.data;
};

export const removeVideoFromPlaylist = async (
    playlistId: string,
    videoId: string,
): Promise<Playlist> => {
    const res = await customAxios.delete(`${PREFIX}/${playlistId}/remove-video/${videoId}`);
    return res.data.data;
};

export const deletePlaylist = async (playlistId: string): Promise<string> => {
    await customAxios.delete(`${PREFIX}/${playlistId}`);
    return playlistId;
};
