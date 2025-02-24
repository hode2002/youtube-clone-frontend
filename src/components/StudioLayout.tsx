import StudioHeader from '@/components/StudioHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StudioSidebar } from '@/components/StudioSidebar';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex h-screen" defaultOpen={true}>
            <StudioSidebar />
            <main className="w-full overflow-hidden">
                <StudioHeader />
                <div className="mt-[64px] py-2">{children}</div>
            </main>
        </SidebarProvider>
    );
}
