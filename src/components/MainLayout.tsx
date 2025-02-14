import Header from '@/components/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { cookies } from 'next/headers';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

    return (
        <SidebarProvider className="flex h-screen" defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full overflow-hidden">
                <Header />
                <div className="mt-[64px] py-2">{children}</div>
            </main>
        </SidebarProvider>
    );
}
