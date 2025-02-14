'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight, History, HomeIcon, ListVideo, PlaySquareIcon, ThumbsUp } from 'lucide-react';
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

type SidebarItem = { title: string; url: string; icon: React.ElementType };

const mainItems: SidebarItem[] = [
    { title: 'Trang chủ', url: '/', icon: HomeIcon },
    { title: 'Kênh đăng ký', url: '/feed/subscriptions', icon: PlaySquareIcon },
];

const forUserItems = [
    { title: 'Video đã xem', url: '/feed/history', icon: History },
    { title: 'Danh sách phát', url: '/feed/playlists', icon: ListVideo },
    { title: 'Video đã thích', url: '/feed/liked', icon: ThumbsUp },
];

const SidebarListItem = ({
    item: { title, url, icon: Icon },
    pathname,
}: {
    item: SidebarItem;
    pathname: string;
}) => (
    <SidebarMenuItem key={title}>
        <SidebarMenuButton asChild className="py-6" isActive={pathname === url}>
            <Link href={url} className="flex items-center">
                <span className="h-6 w-6">
                    <Icon />
                </span>
                <span className="ml-3 text-[1rem] font-normal">{title}</span>
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
        <Sidebar className="mt-16 hidden h-screen px-2 text-foreground md:flex">
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
                                        <p className="text-[1rem] font-normal">Bạn</p>
                                        <ChevronRight size={24} />
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>

                    <SidebarListContent items={forUserItems} />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
