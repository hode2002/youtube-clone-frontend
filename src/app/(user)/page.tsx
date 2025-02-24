'use client';

import VideoCard from '@/components/VideoCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getVideosByCategory } from '@/apiRequests';
import { useSidebar } from '@/components/ui/sidebar';
import { useEffect } from 'react';
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists';
import { useQuery } from '@tanstack/react-query';
import { useFetchSubscriptions } from '@/hooks/useFetchSubscriptions';

export default function Home() {
    const { setOpen } = useSidebar();

    useFetchPlaylists();
    useFetchSubscriptions();

    const { data: videos } = useQuery({
        queryKey: ['video-cate'],
        queryFn: () => getVideosByCategory('music'),
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <ScrollArea className="h-[calc(100vh-72px)] md:pl-7">
            <div className="mx-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos &&
                    videos.map((video) => (
                        <VideoCard key={video._id} video={video} hasAvatar={false} />
                    ))}
            </div>
        </ScrollArea>
    );
}
