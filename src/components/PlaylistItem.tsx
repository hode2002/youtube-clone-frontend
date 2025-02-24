'use client';

import { Dot, MoreVertical, Pencil, Play, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Playlist, UpdatePlaylist } from '@/types';
import Image from 'next/image';
import UpdatePlaylistModal from '@/app/(user)/feed/playlists/UpdatePlaylistModal';
import { useIsMobile } from '@/hooks/use-mobile';

type PlaylistItemProps = {
    playlist: Playlist;
    onUpdate: (id: string, nePlaylist: UpdatePlaylist) => void;
    onDelete: (playlistId: string) => void;
};
const PlaylistItem = ({ playlist, onUpdate, onDelete }: PlaylistItemProps) => {
    const [isHover, setIsHover] = useState(false);
    const router = useRouter();
    const [openEdit, setOpenEdit] = useState(false);
    const { _id, title, thumbnail, description, videos, visibility, removable } = playlist;
    const isMobile = useIsMobile();

    const handleDelete = useCallback(() => {
        onDelete(_id);
    }, []);

    const handleClose = useCallback(() => {
        setOpenEdit(false);
    }, []);

    return (
        playlist && (
            <>
                <div className="flex flex-col gap-1">
                    <div className="rounded-xl">
                        {videos.length === 0 ? (
                            <div className="aspect-video rounded-3xl bg-black/50">
                                <Image
                                    src={thumbnail}
                                    alt={title}
                                    width={200}
                                    height={200}
                                    className="h-full w-full rounded-3xl"
                                />
                            </div>
                        ) : (
                            <div
                                className="relative aspect-video cursor-pointer"
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                            >
                                <div className="h-full w-full overflow-hidden">
                                    {videos && videos?.length > 0 && (
                                        <Image
                                            src={videos[0].thumbnail}
                                            fill
                                            alt={playlist.title}
                                            className="rounded-3xl"
                                        />
                                    )}
                                </div>
                                {isHover && (
                                    <div
                                        className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 rounded-xl bg-black/50 text-white"
                                        onClick={() =>
                                            router.push(`/watch?v=${videos[0].videoId}&list=${_id}`)
                                        }
                                    >
                                        <Play className="fill-current" />
                                        Phát tất cả
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex justify-center pt-2 text-sm text-black dark:text-[#aaa]">
                            <div className="flex-1">
                                <p className="mb-2 text-foreground">{title}</p>
                                <p className="max-w-xl truncate">{description}</p>
                                <p className="flex flex-col md:flex-row">
                                    <span>
                                        {visibility == 'private' ? 'Riêng tư' : 'Công khai'}
                                    </span>
                                    {!isMobile && <Dot />}
                                    <span>Danh sách phát</span>
                                </p>
                                {videos && videos?.length > 0 && removable ? (
                                    <Link
                                        href={`/watch?v=${videos[0].videoId}&list=${_id}`}
                                        className="hover:text-foreground"
                                    >
                                        Xem toàn bộ danh sách
                                    </Link>
                                ) : (
                                    videos?.length > 0 && (
                                        <Link
                                            href={'/playlist?list=LL'}
                                            className="hover:text-foreground"
                                        >
                                            Xem toàn bộ danh sách
                                        </Link>
                                    )
                                )}
                            </div>
                            {removable && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            size="icon"
                                            className="rounded-full"
                                        >
                                            <MoreVertical size={20} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleDelete}>
                                            <Trash2 size={16} className="mr-2" />
                                            Xóa
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                                            <Pencil size={16} className="mr-2" />
                                            Chỉnh sửa
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </div>
                <UpdatePlaylistModal
                    playlist={playlist}
                    isOpen={openEdit}
                    onUpdate={onUpdate}
                    onClose={handleClose}
                />
            </>
        )
    );
};

export default React.memo(PlaylistItem);
