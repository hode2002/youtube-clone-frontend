'use client';

import React, { useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import { useSidebar } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useVideoStore } from '@/stores';
import { getVideos } from '@/apiRequests';

export default function Home() {
    const videos = useVideoStore((state) => state.videos);
    const { setOpen } = useSidebar();

    useEffect(() => {
        (async () => {
            const videos = await getVideos();
            console.log(videos);
        })();
        setOpen(true);
    }, []);

    return (
        <ScrollArea className="h-[calc(100vh-72px)]">
            <div className="mx-4 grid grid-cols-4 gap-4">
                {[...videos, ...videos, ...videos, ...videos, ...videos].map((video, index) => (
                    <VideoCard key={video.id + index} video={video} hasAvatar={false} />
                ))}
            </div>
        </ScrollArea>
    );
}
