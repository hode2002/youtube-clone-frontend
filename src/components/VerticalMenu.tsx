'use client';

import { MoreVertical, MoreHorizontal, ListPlus, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { AddVideoToPlaylistModal } from '@/app/(user)/feed/playlists/AddVideoToPlaylistModal';

type VerticalMenuProps = {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'ghost' | 'outline';
    className?: string;
    _videoId: string;
};

export default function VerticalMenu({
    orientation = 'vertical',
    variant = 'outline',
    className,
    _videoId,
}: VerticalMenuProps) {
    const [open, setOpen] = useState(false);

    const handleAddNew = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={variant} size="icon" className={`rounded-full ${className}`}>
                        {orientation === 'vertical' ? (
                            <MoreVertical size={20} />
                        ) : (
                            <MoreHorizontal size={20} />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleAddNew}>
                        <ListPlus size={16} className="mr-2" /> Thêm vào danh sách phát
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Flag size={16} className="mr-2" /> Báo vi phạm
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AddVideoToPlaylistModal open={open} onClose={handleClose} _videoId={_videoId} />
        </>
    );
}
