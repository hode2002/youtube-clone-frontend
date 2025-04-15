import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Roboto } from 'next/font/google';
import MainLayout from '@/components/MainLayout';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import '@/app/globals.css';
import QueryProvider from '@/components/QueryProvider';
import React from 'react';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' });

export const metadata: Metadata = {
    title: '🎬 YouTube Clone',
    description: 'A full-featured YouTube clone application that allows users to upload, view, interact with, and manage video content with ease. Built with Next.js and Nest.js.',
    keywords: [
        "video sharing", "YouTube clone", "video platform", "content creation",
        "fullstack TypeScript", "web application", "modern web development", "frontend development",
        "backend development", "cloud computing", "scalable web application", "web API development",

        "Next.js", "Next.js App Router", "Next.js API Routes", "React server components",
        "React.js", "Server-side rendering", "Static site generation", "Client-side rendering",
        "SEO optimization with Next.js", "TanStack Query", "React hooks", "Zustand",

        "NestJS", "Node.js backend", "TypeScript backend", "RESTful API", "WebSockets with NestJS",
        "Authentication with NestJS", "Passport.js JWT authentication", "OAuth2 authentication",
        "Google OAuth authentication", "NestJS Dependency Injection",
        "NestJS Middleware", "NestJS Guards", "NestJS Interceptors",

        "MongoDB", "NoSQL database", "MongoDB Atlas", "MongoDB indexing",

        "Redis", "Redis caching", "In-memory caching",

        "Docker", "Docker Compose", "Containerized applications", "Cloudinary",

        "API security", "JWT authentication", "OAuth 2.0", "Rate limiting", "CORS policy",
    ],
    authors: [{ name: "YouTube Clone Project", url: "https://github.com/hode2002/youtube-clone" }],
    creator: "YouTube Clone Project",
    publisher: "YouTube Clone Project",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        noarchive: false,
        nosnippet: false,
    },
    icons: {
        icon: '/logo_144x144.png',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://github.com/hode2002/youtube-clone",
        title: "YouTube Clone",
        description: "A full-featured YouTube clone application built with Next.js and Nest.js",
        images: [
            {
                url: '/logo_144x144.png',
                width: 1200,
                height: 630,
                alt: "YouTube Clone",
            },
        ],
        siteName: "YouTube Clone",
    },
    alternates: {
        canonical: "https://github.com/hode2002/youtube-clone",
        languages: {
            "en": "https://github.com/hode2002/youtube-clone",
        },
    },
    category: "Video Platform",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
                    <QueryProvider>
                        <TooltipProvider>
                            <MainLayout>{children}</MainLayout>
                            <Toaster />
                        </TooltipProvider>
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
