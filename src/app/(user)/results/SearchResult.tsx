'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';
import { Channel, Video } from '@/types';
import { getVideosByKeyword } from '@/apiRequests';
import { Skeleton } from '@/components/ui/skeleton';

const SearchResult = () => {
    const { setOpen } = useSidebar();
    const searchParams = useSearchParams();
    const isMobile = useIsMobile();
    const [channels, setChannels] = useState<Channel[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchQuery = searchParams.get('search_query') || '';

    useEffect(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const res = await getVideosByKeyword(searchQuery.toLocaleLowerCase());
            if (res) {
                setVideos(res.videos);
                setChannels(res.channels);
            }
            setIsLoading(false);
        })();
    }, [searchQuery]);

    return (
        <ScrollArea className="h-screen">
            <div className="mx-auto max-w-7xl">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex w-full gap-4 p-2">
                            <Skeleton className="h-[280px] w-[500px] rounded-3xl" />

                            <div className="flex flex-1 flex-col gap-2">
                                <Skeleton className="h-5 w-full rounded-lg" />
                                <Skeleton className="h-5 w-3/4 rounded-lg" />

                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-5 rounded-lg" />
                                    <Skeleton className="h-5 w-28 rounded-lg" />
                                </div>

                                <div className="mt-4 flex flex-col gap-2">
                                    <Skeleton className="h-5 w-full rounded-lg" />
                                    <Skeleton className="h-5 w-1/2 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : videos.length > 0 ? (
                    videos.map((video) => (
                        <VideoCard key={video._id} video={video} orientation="horizontal" />
                    ))
                ) : (
                    <div className="fixed left-[calc(50%-280px)] top-[calc(50%-128px)] flex flex-col items-center justify-center">
                        <Image
                            src={'/notfound.svg'}
                            width={isMobile ? 100 : 448}
                            height={100}
                            alt="not found"
                        />
                        <p className="py-4 text-xl font-bold">Không tìm thấy kết quả</p>
                        <p>Hãy thử các từ khóa khác nhau hoặc xóa bộ lọc tìm kiếm</p>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
};

export default SearchResult;
