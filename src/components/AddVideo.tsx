'use client';

import CreateChannelModal from '@/components/CreateChannelModal';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, SquarePlay } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUserStore } from '../stores/user.store';
import PickVideoModal from '@/components/PickVideoModal';
import { useRouter, useSearchParams } from 'next/navigation';

const AddVideo = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [open, setOpen] = useState(false);
    const { profile } = useUserStore();
    const type = searchParams.get('video');

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (type && type === 'up') {
            timeout = setTimeout(() => {
                setOpen(true);
                router.replace(window.location.pathname);
            }, 500);
        }
        return () => clearTimeout(timeout);
    }, [type]);

    const handleOpenModal = () => {
        if (profile?.hasChannel) {
            router.push('/studio?video=up');
            return;
        }
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="rounded-full bg-[#272727] text-white hover:cursor-pointer hover:bg-transparent"
                    >
                        <Plus />
                        <span>Tạo</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={handleOpenModal}>
                        <SquarePlay />
                        Tải video lên
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {profile?.hasChannel ? (
                <PickVideoModal open={open} onClose={handleCloseModal} />
            ) : (
                <CreateChannelModal open={open} setOpen={setOpen} />
            )}
        </>
    );
};

export default AddVideo;
