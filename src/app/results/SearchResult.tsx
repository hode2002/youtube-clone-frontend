'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { useVideoStore } from '@/stores';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';
import { Video } from '@/types';

const SearchResult = () => {
    const { setOpen } = useSidebar();
    const searchParams = useSearchParams();
    const isMobile = useIsMobile();
    const videos = useVideoStore((state) => state.videos);
    const [videosFilter, setVideosFilter] = useState<Video[]>([]);
    const searchQuery = searchParams.get('search_query') || '';

    useEffect(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        const videosFilter = videos.filter((v) =>
            v.title.toLocaleLowerCase('vi').includes(searchQuery),
        );
        setVideosFilter(videosFilter);
    }, [searchQuery]);

    return (
        <ScrollArea className="h-screen">
            <div className="mx-auto max-w-7xl">
                {videosFilter && videosFilter?.length ? (
                    videosFilter.map((video, index) => (
                        <VideoCard key={video.id + index} video={video} orientation="horizontal" />
                    ))
                ) : (
                    <div
                        className={`fixed left-[calc(50%-280px)] top-[calc(50%-128px)] flex flex-col items-center justify-center`}
                    >
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
