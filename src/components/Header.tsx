import { Input } from '@/components/ui/input';
import { ModeToggle } from './ModeToggle';
import { Bell, LogOut, Plus, SearchIcon, SquarePlay } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Header() {
    return (
        <header className="fixed left-0 right-0 top-0 h-16 bg-background px-2 text-foreground">
            <div className="flex items-center justify-between p-2">
                <div className="flex h-10 items-center gap-2">
                    {/* Sidebar Trigger */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarTrigger className="p-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Ctrl + b</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Logo */}
                    <Link href={'/'} className="flex items-center justify-center gap-x-1">
                        <Logo />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="hidden flex-1 items-center justify-center md:flex">
                    <Input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="w-1/2 rounded-l-full border px-4 py-5 focus:mr-[1px]"
                        style={{ outline: 'none' }}
                    />
                    <div className="flex h-[40px] items-center justify-center rounded-r-full border bg-[#272727] px-6 py-5 transition-all hover:scale-95 hover:cursor-pointer">
                        <SearchIcon className="text-background dark:text-foreground" />
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-2 md:gap-5">
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
                            <DropdownMenuItem>
                                <SquarePlay />
                                Tải video lên
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

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

                    {/* Toggle Theme */}
                    <ModeToggle />

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
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
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
                            <DropdownMenuItem className="flex cursor-pointer items-center">
                                <LogOut />
                                <div className="flex flex-col">Đăng xuất</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-2 flex items-center justify-center md:hidden">
                <Input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="w-full rounded-l-full border px-4 py-5 focus:mr-0.5"
                />
                <div className="flex h-[40px] items-center justify-center rounded-r-full border bg-[#272727] px-6 py-5 transition-all hover:scale-95 hover:cursor-pointer">
                    <SearchIcon className="text-background dark:text-foreground" />
                </div>
            </div>
        </header>
    );
}
