'use client';

import VideoPlayer from '@/app/(user)/watch/VideoPlayer';
import ChannelCard from '@/components/ChannelCard';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VerticalMenu from '@/components/VerticalMenu';
import VideoDescription from '@/app/(user)/watch/VideoDescription';
import LikeDislikeButton from '@/app/(user)/watch/LikeDislikeButton';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';
import { addToWatchHistory, getVideoById, increaseViewByVideoId } from '@/apiRequests';
import { Video } from '@/types';
import { useChannelStore } from '@/stores';
import { useIsMobile } from '@/hooks/use-mobile';
import CommentSection from '@/app/(user)/watch/CommentSection';

const LeftSection = ({ className }: { className?: string }) => {
    const { setOpen } = useSidebar();
    const searchParams = useSearchParams();
    const videoId = searchParams.get('v') || '';
    const [video, setVideo] = useState<Video | null>(null);
    const isMobile = useIsMobile();

    const { channel: owner } = useChannelStore();

    useEffect(() => {
        setOpen(false);
    }, []);

    useEffect(() => {
        if (!videoId) return;

        (async () => {
            const res = await getVideoById(videoId);
            setVideo(res ?? null);
            await increaseViewByVideoId(videoId);
            await addToWatchHistory(videoId);
        })();
    }, [videoId]);

    return (
        <div className={className}>
            {videoId && video && <VideoPlayer url={video.url} />}

            {videoId && video && (
                <div className="px-3 py-2">
                    <p className="text-xl font-semibold capitalize">{video.title}</p>
                    <div className="md:md-0 my-4 flex flex-col items-center justify-between md:flex-row">
                        {video.channel && (
                            <ChannelCard
                                channel={video.channel}
                                isOwner={(owner && owner._id === video.channel._id) || false}
                            />
                        )}
                        <div
                            className={`${isMobile && 'w-full'} flex items-end justify-between gap-4`}
                        >
                            <LikeDislikeButton
                                initialLikes={video.likesCount}
                                initialDislikes={video.dislikesCount}
                                targetType="video"
                                targetId={video._id}
                            />
                            <div className="flex gap-2">
                                <Button
                                    variant={'outline'}
                                    className="flex items-center rounded-3xl"
                                >
                                    <Download size={20} />
                                    <span>Tải xuống</span>
                                </Button>
                                <VerticalMenu orientation="horizontal" _videoId={video._id} />
                            </div>
                        </div>
                    </div>
                    <VideoDescription
                        views={video.viewsCount}
                        uploadTime={video.publishedAt}
                        category={video.category}
                        content={video.description}
                    />
                    <CommentSection _videoId={video._id} />
                </div>
            )}
        </div>
    );
};

export default LeftSection;
