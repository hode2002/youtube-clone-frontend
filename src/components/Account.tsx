'use client';

import { ModeToggle } from './ModeToggle';
import { Bell } from 'lucide-react';
import AddVideo from '@/components/AddVideo';
import GoogleAuth from '@/components/GoogleAuth';
import { useUserStore } from '@/stores';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
const Account = () => {
    const { profile } = useUserStore();

    return (
        <div className="flex items-center gap-2 md:gap-5">
            {profile && (
                <>
                    <AddVideo />

                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Bell className="h-6 w-6 cursor-pointer" />
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Thông báo</p>
                            </TooltipContent>
                        </Tooltip>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Thông báo của bạn hiển thị ở đây</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}

            {/* Toggle Theme */}
            <ModeToggle />

            {/* Authentication */}
            <GoogleAuth />
        </div>
    );
};

export default Account;
