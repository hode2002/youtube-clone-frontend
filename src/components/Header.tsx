import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import Account from '@/components/Account';

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

                <SearchBar />

                <Account />
            </div>
        </header>
    );
}
