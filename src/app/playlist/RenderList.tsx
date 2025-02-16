'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import VideoCard from '@/components/VideoCard';
import { useVideoStore } from '@/stores';
import { Play } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const RenderList = () => {
    const { setOpen } = useSidebar();
    const searchParams = useSearchParams();
    const type = searchParams.get('list') || 'LL';
    const router = useRouter();
    const videos = useVideoStore((state) => state.videos);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleRedirect = (url: string) => {
        return router.push('/watch/?v=' + url + '&list=' + type);
    };

    return (
        <div className="mx-4 grid grid-cols-12">
            <div className="col-span-3">
                <div className="h-screen rounded-xl bg-gradient-to-b from-[#272727] to-white p-8 dark:to-black">
                    <div
                        className="relative cursor-pointer"
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    >
                        <VideoCard video={videos[0]} showThumbnailOnly />
                        {isHover && (
                            <div
                                className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 rounded-xl bg-black/50 text-white"
                                onClick={() => handleRedirect(videos[0].videoUrl)}
                            >
                                <Play className="fill-current" />
                                Phát tất cả
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant="default"
                            className="hover:bg-[#3ea6ff mt-4 flex items-center rounded-3xl bg-foreground text-background hover:opacity-80 disabled:bg-[#272727]"
                            onClick={() => handleRedirect(videos[0].videoUrl)}
                        >
                            <Play className="fill-current text-background" />
                            Phát tất cả
                        </Button>
                    </div>
                </div>
            </div>
            <ScrollArea className="col-span-9 h-[calc(100vh-72px)]">
                <div className="mx-auto max-w-7xl">
                    {videos &&
                        videos?.length &&
                        videos.map((video, index) => (
                            <div
                                key={video.id + index}
                                className="mx-2 flex cursor-pointer items-center gap-4 rounded-xl px-4 hover:bg-slate-200 dark:hover:bg-[#272727]"
                            >
                                {index + 1}
                                <VideoCard
                                    video={video}
                                    orientation="horizontal"
                                    onRedirect={handleRedirect}
                                />
                            </div>
                        ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default RenderList;
