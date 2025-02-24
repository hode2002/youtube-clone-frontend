'use client';

import { getSubscribedVideos } from '@/apiRequests';
import VideoGrid from '@/app/(user)/feed/subscriptions/VideoGrid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Video } from '@/types';
import { useEffect, useState } from 'react';

const MainSection = () => {
    const { setOpen } = useSidebar();
    const [videos, setVideos] = useState<Video[] | undefined>();

    useEffect(() => {
        setOpen(true);
        (async () => {
            const res = await getSubscribedVideos();
            setVideos(res);
        })();
    }, []);

    const isLoading = videos === undefined;

    return (
        <ScrollArea className="h-[calc(100vh-72px)] md:pl-7">
            {isLoading ? (
                <div className="mx-2 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="mx-2 flex flex-col gap-2 md:mx-0">
                            <Skeleton className="h-52 w-auto" />
                            <Skeleton className="h-4 w-auto" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ))}
                </div>
            ) : (
                videos.length > 0 && <VideoGrid videos={videos} />
            )}
        </ScrollArea>
    );
};

export default MainSection;
