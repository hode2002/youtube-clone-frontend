'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { LogOut, Video } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type SidebarItem = { id?: string; title: string; url: string; icon: React.ElementType | string };

const mainItems: SidebarItem[] = [
    { title: 'Nội dung', url: '/studio', icon: Video },
    { title: 'Quay lại trang chủ', url: '/', icon: LogOut },
];

export function StudioSidebar() {
    return (
        <ScrollArea className="h-screen md:px-5">
            <Sidebar className="mt-16 hidden h-screen text-foreground md:flex">
                <SidebarContent className="bg-background">
                    <SidebarGroup>
                        <SidebarListContent items={mainItems} />
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </ScrollArea>
    );
}

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
                            <AvatarFallback>{title.charAt(0).toUpperCase()}</AvatarFallback>
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
