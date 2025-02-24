import React from 'react';
import VideoCard from '@/components/VideoCard';
import { Video } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface HistoryBlock {
    title: string;
    videos: Video[];
}
const HistoryBlock = ({ title, videos = [] }: HistoryBlock) => {
    const isMobile = useIsMobile();
    return (
        <div className="mx-auto max-w-7xl">
            <h1 className="p-4 text-xl font-extrabold md:px-0">{title}</h1>
            {videos &&
                videos.length &&
                videos.map((video) => (
                    <VideoCard
                        key={video._id}
                        video={video}
                        hasAvatar={isMobile ? false : true}
                        orientation={isMobile ? 'vertical' : 'horizontal'}
                    />
                ))}
        </div>
    );
};

export default HistoryBlock;
