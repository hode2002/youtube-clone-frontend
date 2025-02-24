import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import StudioLogo from '@/components/StudioLogo';
import StudioAccount from '@/components/StudioAccount';

export default function StudioHeader() {
    return (
        <header className="fixed left-0 right-0 top-0 h-16 px-2 text-foreground">
            <div className="flex items-center justify-between p-2">
                <div className="flex h-10 items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarTrigger className="p-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Ctrl + b</p>
                        </TooltipContent>
                    </Tooltip>

                    <Link href={'/studio'} className="flex items-center justify-center gap-x-1">
                        <StudioLogo />
                    </Link>
                </div>

                <StudioAccount />
            </div>
        </header>
    );
}
