'use client';

import { fetchUserData, logout } from '@/apiRequests';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '@/lib/utils';
import { useUserStore } from '@/stores';
import { LogOut } from 'lucide-react';
import { useEffect } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const GoogleAuth = () => {
    const profile = useUserStore((state) => state.profile);

    useEffect(() => {
        (async () => await fetchUserData())();

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

    return profile ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>HVD</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex gap-4 p-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>HVD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <div>
                            <p>HVD</p>
                            <p>{1 ? '@hvd.0706' : 'hvd0706@gmail.com'}</p>
                        </div>
                        <Button variant={'link'} className="px-0 text-[#5e84f1]">
                            {1 ? 'Xem kênh của bạn' : 'Tạo kênh'}
                        </Button>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex cursor-pointer items-center" onClick={logout}>
                    <LogOut />
                    <div className="flex flex-col">Đăng xuất</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button variant={'outline'} onClick={loginPopup} className="rounded-3xl">
            Đăng nhập
        </Button>
    );
};

export default GoogleAuth;
