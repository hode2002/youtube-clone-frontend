import { Video } from '@/types';
import React, { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';

type VideoSectionProps = {
    videos: Video[];
};
export default function VideoSection({ videos }: VideoSectionProps) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (videos.length === 0) return;
        setIsLoading(false);
    }, [videos]);

    return (
        <div>
            {isLoading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="mx-2 flex flex-col gap-2 md:mx-0">
                            <Skeleton className="h-52 w-auto" />
                            <Skeleton className="h-4 w-auto" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ))}
                </div>
            ) : videos.length > 0 ? (
                <div className="grid grid-cols-1 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} hasAvatar={false} />
                    ))}
                </div>
            ) : (
                <div className="flex w-full justify-center">
                    Kênh này không có bất kỳ nội dung nào
                </div>
            )}
        </div>
    );
}
