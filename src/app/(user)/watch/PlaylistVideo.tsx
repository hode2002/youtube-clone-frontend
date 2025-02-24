import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import VideoCard from '@/components/VideoCard';
import { Video } from '@/types';
import { Separator } from '@/components/ui/separator';

interface PlaylistVideoProps {
    title: string;
    owner: string;
    videos: Video[];
}
const PlaylistVideo = ({ title, owner, videos }: PlaylistVideoProps) => {
    const router = useRouter();
    const [currIdx, setCurrIdx] = useState(1);
    const searchParams = useSearchParams();
    const videoId = searchParams.get('v');
    const list = searchParams.get('list');

    const handleRedirect = (videoId: string) => {
        router.push(`/watch/?v=${videoId}&list=${list}`);
    };

    const isActive = (currVideo: Video) => {
        return currVideo.videoId === videoId;
    };

    return (
        <div className="mb-4 h-[650px] rounded-xl border">
            <div className="rounded-t-xl bg-[#272727] p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold text-background dark:text-foreground">
                        {title}
                    </h1>
                    <p className="flex gap-2 text-sm">
                        <span className="text-background dark:text-foreground">{owner}</span>
                        <span className="text-[#aaa]">
                            {currIdx}/{videos.length}
                        </span>
                    </p>
                </div>
            </div>
            <Separator className="h-px bg-white" />
            <ScrollArea className="h-[calc(675px-88px)]">
                {videos.map((video: Video, index) => (
                    <div
                        key={video._id}
                        onClick={() => setCurrIdx(index + 1)}
                        className={`flex cursor-pointer items-center gap-2 p-1 px-2 ${isActive(video) && 'bg-slate-200 dark:bg-[#272727]'}`}
                    >
                        <p className="flex-1 text-sm">
                            {isActive(video) ? (
                                <Play size={10} className="fill-current" />
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </p>
                        <VideoCard
                            key={video._id}
                            video={video}
                            orientation="horizontal"
                            hasAvatar={false}
                            onRedirect={handleRedirect}
                        />
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
};

export default PlaylistVideo;
