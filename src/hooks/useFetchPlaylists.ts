import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist,
} from '@/apiRequests';
import { useAuth } from '@/hooks/useAuth';
import { usePlaylistStore } from '@/stores';
import { CreatePlaylist, Playlist, UpdatePlaylist } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useFetchPlaylists = () => {
    const { playlists, setPlaylists } = usePlaylistStore();
    const { profile } = useAuth();

    return useQuery({
        queryKey: ['playlists', profile?._id],
        queryFn: async () => {
            const data = await getUserPlaylists();
            setPlaylists(data);
            return data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        initialData: playlists.length > 0 ? playlists : undefined,
        enabled: !!profile,
        select: (data) => data ?? [],
    });
};

export const useAddPlaylist = () => {
    const queryClient = useQueryClient();
    const { addPlaylist } = usePlaylistStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: (playlist: CreatePlaylist) => createPlaylist(playlist),
        onSuccess: (newPlaylist) => {
            addPlaylist(newPlaylist);
            queryClient.invalidateQueries({ queryKey: ['playlists', profile?._id] });
        },
    });
};

export const useAddVideoToPlaylist = () => {
    const queryClient = useQueryClient();
    const { editPlaylist } = usePlaylistStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: ({ playlistId, videoId }: { playlistId: string; videoId: string }) =>
            addVideoToPlaylist(playlistId, videoId),
        onSuccess: (newPlaylist) => {
            editPlaylist(newPlaylist);
            queryClient.invalidateQueries({ queryKey: ['playlists', profile?._id] });
        },
    });
};

export const useRemoveVideoFromPlaylist = () => {
    const queryClient = useQueryClient();
    const { editPlaylist } = usePlaylistStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: ({ playlistId, videoId }: { playlistId: string; videoId: string }) =>
            removeVideoFromPlaylist(playlistId, videoId),
        onSuccess: (newPlaylist) => {
            editPlaylist(newPlaylist);
            queryClient.invalidateQueries({ queryKey: ['playlists', profile?._id] });
        },
    });
};

export const useEditPlaylist = () => {
    const queryClient = useQueryClient();
    const { editPlaylist } = usePlaylistStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: ({ id, playlist }: { id: string; playlist: UpdatePlaylist }) =>
            updatePlaylist(id, playlist),
        onSuccess: (playlist: Playlist) => {
            editPlaylist(playlist);
            queryClient.invalidateQueries({ queryKey: ['playlists', profile?._id] });
        },
    });
};

export const useRemovePlaylist = () => {
    const queryClient = useQueryClient();
    const { removePlaylist } = usePlaylistStore();
    const { profile } = useAuth();

    return useMutation({
        mutationFn: ({ playlistId }: { playlistId: string }) => deletePlaylist(playlistId),
        onSuccess: (playlistId) => {
            removePlaylist(playlistId);
            queryClient.invalidateQueries({ queryKey: ['playlists', profile?._id] });
        },
    });
};
