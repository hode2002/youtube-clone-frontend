import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Roboto } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import '@/app/globals.css';
import StudioLayout from '@/components/StudioLayout';
import QueryProvider from '@/components/QueryProvider';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' });

export const metadata: Metadata = {
    title: 'Youtube Creator Studio',
    description:
        'Thưởng thức video và nhạc bạn yêu thích, tải nội dung do bạn sáng tạo lên và chia sẻ nội dung đó với gia đình, bạn bè cũng như mọi người trên YouTube.',
    icons: {
        icon: '/logo_144x144.png',
    },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={roboto.className} suppressHydrationWarning>
            <head />
            <body className={`font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <QueryProvider>
                            <StudioLayout>{children}</StudioLayout>
                            <Toaster />
                        </QueryProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
