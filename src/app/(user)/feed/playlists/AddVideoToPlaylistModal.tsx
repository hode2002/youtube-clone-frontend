'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CreatePlaylistModal from '@/app/(user)/feed/playlists/CreatePlaylistModal';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Earth, LockKeyhole } from 'lucide-react';
import { usePlaylistStore } from '@/stores';
import {
    useAddPlaylist,
    useAddVideoToPlaylist,
    useRemoveVideoFromPlaylist,
} from '@/hooks/useFetchPlaylists';

interface AddToPlaylistModalProps {
    open: boolean;
    onClose: () => void;
    _videoId: string;
}

export const AddVideoToPlaylistModal = React.memo(
    ({ open, onClose, _videoId }: AddToPlaylistModalProps) => {
        const { toast } = useToast();
        const { playlists } = usePlaylistStore();
        const { mutate: addPlaylist } = useAddPlaylist();
        const { mutate: addVideo } = useAddVideoToPlaylist();
        const { mutate: removeVideo } = useRemoveVideoFromPlaylist();
        const [selectedPlaylists, setSelectedPlaylists] = useState<Record<string, boolean>>({});
        const [openAddNew, setOpenAddNew] = useState(false);

        useEffect(() => {
            setSelectedPlaylists(
                playlists.reduce(
                    (acc, playlist) => {
                        acc[playlist._id] = playlist.videos.some((v) => v._id === _videoId);
                        return acc;
                    },
                    {} as Record<string, boolean>,
                ),
            );
        }, [playlists, _videoId]);

        const handleClose = useCallback(() => {
            setOpenAddNew(false);
            onClose();
        }, []);

        const handleTogglePlaylist = (playlistId: string) => {
            const prevSelected = selectedPlaylists[playlistId];

            const currentPlaylist = playlists.find((p) => p._id === playlistId);
            if (!currentPlaylist) {
                toast({ description: `Có lỗi xảy ra, vui lòng thử lại` });
                return;
            }

            if (!prevSelected) {
                addVideo({ playlistId, videoId: _videoId });
                toast({ description: `Đã thêm vào ${currentPlaylist.title}` });
            } else {
                removeVideo({ playlistId, videoId: _videoId });
                toast({ description: `Đã xóa khỏi ${currentPlaylist.title}` });
            }

            setSelectedPlaylists((prev) => ({
                ...prev,
                [playlistId]: !prevSelected,
            }));
        };

        const handleCreate = (title: string, visibility: 'public' | 'private') => {
            addPlaylist({ title, visibility });
            toast({
                description: 'Playlist đã được tạo',
            });
        };

        return (
            <>
                <Dialog open={open} onOpenChange={onClose}>
                    <DialogContent className="max-w-xs p-4">
                        <DialogHeader>
                            <DialogTitle>Thêm vào danh sách phát</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-60 space-y-2">
                            {playlists?.length ? (
                                playlists
                                    .filter((p) => p.removable)
                                    .map((playlist) => (
                                        <div
                                            key={playlist._id}
                                            className="flex items-center justify-between rounded-lg p-2 transition"
                                        >
                                            <Checkbox
                                                checked={selectedPlaylists[playlist._id]}
                                                onCheckedChange={() =>
                                                    handleTogglePlaylist(playlist._id)
                                                }
                                            />
                                            <span className="ml-4 flex-1 text-left">
                                                {playlist.title}
                                            </span>
                                            {playlist.visibility === 'public' ? (
                                                <Earth />
                                            ) : (
                                                <LockKeyhole />
                                            )}
                                        </div>
                                    ))
                            ) : (
                                <p className="text-sm text-gray-500">Chưa có danh sách phát nào.</p>
                            )}
                        </ScrollArea>
                        <Button
                            className="mt-2 w-full"
                            variant="outline"
                            onClick={() => setOpenAddNew(true)}
                        >
                            Tạo mới
                        </Button>
                    </DialogContent>
                </Dialog>
                <CreatePlaylistModal
                    isOpen={openAddNew}
                    onClose={handleClose}
                    onCreate={handleCreate}
                />
            </>
        );
    },
);
