'use client';

import CreatePlaylistModal from '@/app/(user)/feed/playlists/CreatePlaylistModal';
import PlaylistItem from '@/components/PlaylistItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { useAddPlaylist, useEditPlaylist, useRemovePlaylist } from '@/hooks/useFetchPlaylists';
import { usePlaylistStore } from '@/stores';
import { UpdatePlaylist } from '@/types';
import { Plus } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

const RenderPlaylist = () => {
    const { setOpen } = useSidebar();
    const { toast } = useToast();
    const [openCreate, setOpenCreate] = useState(false);
    const { playlists } = usePlaylistStore();
    const { mutate: addPlaylist } = useAddPlaylist();
    const { mutate: removePlaylist } = useRemovePlaylist();
    const { mutate: editPlaylist } = useEditPlaylist();

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleCreate = useCallback((title: string, visibility: 'public' | 'private') => {
        addPlaylist({ title, visibility });
        toast({
            description: 'Playlist đã được tạo',
        });
    }, []);

    const handleUpdate = useCallback((id: string, playlist: UpdatePlaylist) => {
        editPlaylist({ id, playlist });
        toast({
            description: 'Thành công',
        });
    }, []);

    const handleDelete = useCallback((playlistId: string) => {
        removePlaylist({ playlistId });
        toast({
            description: 'Playlist đã được xóa',
        });
    }, []);

    const handleClose = () => {
        setOpenCreate(false);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="mt-14 text-xl font-extrabold md:mt-0 md:text-4xl">Danh sách phát</h1>
                <span className="cursor-pointer p-1" onClick={() => setOpenCreate(true)}>
                    <Plus />
                </span>
                <CreatePlaylistModal
                    isOpen={openCreate}
                    onClose={handleClose}
                    onCreate={handleCreate}
                />
            </div>
            <ScrollArea className="h-[calc(100vh-120px)] min-h-max pt-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {playlists &&
                        playlists.length > 0 &&
                        playlists?.map((item) => (
                            <PlaylistItem
                                key={item._id}
                                playlist={item}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default React.memo(RenderPlaylist);
