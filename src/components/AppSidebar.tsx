'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
    ChevronRight,
    History,
    HomeIcon,
    List,
    ListVideo,
    PlaySquareIcon,
    ThumbsUp,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type SidebarItem = { id?: string; title: string; url: string; icon: React.ElementType | string };

const mainItems: SidebarItem[] = [
    { title: 'Trang chủ', url: '/', icon: HomeIcon },
    { title: 'Kênh đăng ký', url: '/feed/subscriptions', icon: PlaySquareIcon },
];

const forUserItems = [
    { title: 'Video đã xem', url: '/feed/history', icon: History },
    { title: 'Danh sách phát', url: '/feed/playlists', icon: ListVideo },
    { id: 'LL', title: 'Video đã thích', url: '/playlist?list=LL', icon: ThumbsUp },
];

const userChannels = [
    { title: 'Kênh đăng ký 1', url: '/@channel1', icon: 'https://github.com/shadcn.png' },
    { title: 'Kênh đăng ký 2', url: '/@channel2', icon: 'https://github.com/shadcn.png' },
    { title: 'Kênh đăng ký 3', url: '/@channel3', icon: 'https://github.com/shadcn.png' },
    { title: 'Kênh đăng ký 4', url: '/@channel4', icon: 'https://github.com/shadcn.png' },
    { title: 'Kênh đăng ký 5', url: '/@channel5', icon: 'https://github.com/shadcn.png' },
    { title: 'Kênh đăng ký 6', url: '/@channel6', icon: 'https://github.com/shadcn.png' },
    { title: 'Kênh đăng ký 7', url: '/@channel7', icon: 'https://github.com/shadcn.png' },
    { title: 'Tất cả kênh đăng ký', url: '/feed/channels', icon: List },
];

const SidebarListItem = ({
    item: { id, title, url, icon: Icon },
    pathname,
}: {
    item: SidebarItem;
    pathname: string;
}) => (
    <SidebarMenuItem>
        <SidebarMenuButton
            asChild
            className="py-6"
            isActive={useSearchParams().get('list') === id || pathname === url}
        >
            <Link href={url} className="grid grid-cols-5 content-center gap-0">
                <p className="col-span-1">
                    {typeof Icon === 'string' ? (
                        <Avatar>
                            <AvatarImage
                                className="m-auto h-6 w-6 rounded-full object-cover"
                                src={Icon}
                                alt={title}
                                loading="lazy"
                            />
                            <AvatarFallback>{title.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ) : (
                        <span className="fill-current">
                            <Icon />
                        </span>
                    )}
                </p>
                <p className="col-span-4 truncate text-[1rem] font-normal">{title}</p>
            </Link>
        </SidebarMenuButton>
    </SidebarMenuItem>
);
const SidebarListContent = ({ items }: { items: SidebarItem[] }) => (
    <SidebarGroupContent>
        <SidebarMenu>
            {items.map((item) => {
                const pathname = usePathname();
                return <SidebarListItem key={item.title} item={item} pathname={pathname} />;
            })}
        </SidebarMenu>
    </SidebarGroupContent>
);

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <ScrollArea className="h-screen md:px-5">
            <Sidebar className="mt-16 hidden h-screen text-foreground md:flex">
                <SidebarContent className="bg-background">
                    <SidebarGroup>
                        <SidebarListContent items={mainItems} />
                        <SidebarSeparator className="my-2" />
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        className="py-6"
                                        isActive={pathname.includes('/you')}
                                    >
                                        <Link href={'/you'} className="flex items-center">
                                            <p className="text-[1rem] font-semibold">Bạn</p>
                                            <ChevronRight size={24} />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                        <SidebarListContent items={forUserItems} />
                        <SidebarSeparator className="my-2" />
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <div className="px-2 py-3 text-[1rem] font-semibold disabled:text-foreground">
                                        Kênh đăng ký
                                    </div>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                        <SidebarListContent items={userChannels} />
                        <SidebarSeparator className="my-2" />
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </ScrollArea>
    );
}
