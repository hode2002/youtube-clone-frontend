'use client';

import { gePlaylistById, getLikedVideos } from '@/apiRequests';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/ui/sidebar';
import VideoCard from '@/components/VideoCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserStore } from '@/stores';
import { Playlist, Video } from '@/types';
import { Dot, Play } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

const RenderList = () => {
    const { setOpen } = useSidebar();
    const searchParams = useSearchParams();
    const list = searchParams.get('list');
    const router = useRouter();
    const [isHover, setIsHover] = useState(false);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const { profile } = useUserStore();
    const isMobile = useIsMobile();

    if (!list?.trim()) {
        router.push('/');
        return;
    }

    useEffect(() => {
        setOpen(true);
        (async () => {
            if (list === 'LL') {
                const data = await getLikedVideos();
                const videos = data.map((i) => i.target);
                setVideos(videos);
            } else {
                const res = await gePlaylistById(list);
                setPlaylist(res);
                setVideos(res.videos);
            }
        })();
    }, []);

    const handleRedirect = (videoId: string) => {
        return router.push('/watch/?v=' + videoId + '&list=' + list);
    };

    const playlistTitle = useMemo(() => {
        return list === 'LL' ? 'Video đã thích' : playlist?.title;
    }, [list]);

    return (
        videos &&
        videos.length > 0 && (
            <div className="mx-4 grid-cols-12 md:grid">
                <div className="col-span-3">
                    <div className="rounded-xl bg-gradient-to-b from-[#272727] to-white p-8 dark:to-black md:h-screen">
                        <div
                            className="relative cursor-pointer"
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            <div className="aspect-video overflow-hidden">
                                <Image
                                    src={videos[0].thumbnail}
                                    className="rounded-3xl"
                                    fill
                                    alt={videos[0].title}
                                />
                            </div>
                            {isHover && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-2 rounded-3xl bg-black/50 text-white"
                                    onClick={() => handleRedirect(videos[0].videoId)}
                                >
                                    <Play className="fill-current" />
                                    Phát tất cả
                                </div>
                            )}
                        </div>

                        <p className="my-2 text-2xl font-semibold">{playlistTitle}</p>
                        <div className="flex items-center gap-2">
                            <p className="py-2 text-sm">
                                {profile?.fullName ? profile?.fullName : profile?.email}
                            </p>
                            <Dot />
                            <p className="py-2 text-sm">{videos.length} video</p>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                variant="default"
                                className="hover:bg-[#3ea6ff mt-4 flex items-center rounded-3xl bg-foreground text-background hover:opacity-80 disabled:bg-[#272727]"
                                onClick={() => handleRedirect(videos[0].videoId)}
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
                            videos.map((video, index) =>
                                isMobile ? (
                                    <div key={video._id} className="mt-4">
                                        <VideoCard
                                            video={video}
                                            hasAvatar={false}
                                            orientation={'vertical'}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        key={video._id}
                                        className="mx-2 flex cursor-pointer items-center gap-4 rounded-xl px-4 hover:bg-slate-200 dark:hover:bg-[#272727]"
                                    >
                                        {index + 1}
                                        <VideoCard
                                            video={video}
                                            hasAvatar={true}
                                            orientation={'horizontal'}
                                        />
                                    </div>
                                ),
                            )}
                    </div>
                </ScrollArea>
            </div>
        )
    );
};

export default RenderList;
