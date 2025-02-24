import Header from '@/components/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex h-screen" defaultOpen={true}>
            <AppSidebar />
            <main className="w-full overflow-hidden">
                <Header />
                <div className="mt-[64px] min-w-[440px] py-2">{children}</div>
            </main>
        </SidebarProvider>
    );
}
