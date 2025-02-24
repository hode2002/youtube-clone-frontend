'use client';

import CreateChannelModal from '@/components/CreateChannelModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '@/lib/utils';
import { Clapperboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const GoogleAuth = () => {
    const logout = useLogout();
    const { profile, channel } = useAuth();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            const reload = getItemFromLocalStorage('reload');

            if (reload === 'true' || (event.key === 'reload' && event.newValue === 'true')) {
                removeItemFromLocalStorage('reload');
                return location.reload();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const loginPopup = () => {
        window.open(`${apiBaseUrl}/auth/google`, '_blank', 'width=500,height=600');
    };

    if (!profile) {
        return (
            <Button variant="outline" onClick={loginPopup} className="rounded-3xl">
                Đăng nhập
            </Button>
        );
    }

    const avatarUrl = profile.hasChannel ? channel?.avatarUrl : profile.avatarUrl;
    const displayUsername = profile.hasChannel ? channel?.uniqueName : profile.username;
    const displayFullname = profile.hasChannel ? channel?.name : profile.fullName;
    const channelAction = profile.hasChannel ? 'Xem kênh của bạn' : 'Tạo kênh';

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={avatarUrl} alt={displayUsername} />
                        <AvatarFallback>{profile.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                    <div className="flex gap-4 p-3">
                        <Avatar>
                            <AvatarImage src={avatarUrl} alt={profile.username} />
                            <AvatarFallback>
                                {profile.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p>{displayFullname}</p>
                            <p>{displayUsername}</p>
                            {profile.hasChannel ? (
                                <Button
                                    asChild
                                    variant={'link'}
                                    className="justify-start px-0 text-[#5e84f1]"
                                >
                                    <Link href={`/${channel?.uniqueName}`}>{channelAction}</Link>
                                </Button>
                            ) : (
                                <Button
                                    variant={'link'}
                                    className="justify-start px-0 text-[#5e84f1]"
                                    onClick={() => setOpen(true)}
                                >
                                    Tạo kênh
                                </Button>
                            )}
                        </div>
                    </div>
                    <DropdownMenuSeparator />

                    {profile?.hasChannel && (
                        <>
                            <DropdownMenuItem
                                className="flex cursor-pointer items-center py-2"
                                asChild
                            >
                                <Link href={'/studio'}>
                                    <Clapperboard />
                                    <span>Studio</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    <DropdownMenuItem
                        className="flex cursor-pointer items-center py-2"
                        onClick={logout}
                    >
                        <LogOut />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {!profile?.hasChannel && <CreateChannelModal open={open} setOpen={setOpen} />}
        </>
    );
};

export default GoogleAuth;
