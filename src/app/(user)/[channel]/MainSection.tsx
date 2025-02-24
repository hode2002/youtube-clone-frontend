'use client';

import { useEffect, useState } from 'react';
import ChannelSection from '@/app/(user)/[channel]/ChannelSection';
import VideoSection from '@/app/(user)/[channel]/VideoSection';
import { getByUniqueName, getVideoByChannel } from '@/apiRequests';
import { Channel, Video } from '@/types';

const MainSection = ({ uniqueName }: { uniqueName: string }) => {
    const [channel, setChannel] = useState<Channel | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        (async () => {
            const channel = await getByUniqueName(uniqueName);
            setChannel(channel);
            const videos = await getVideoByChannel(uniqueName);
            setVideos(videos);
        })();
    }, [uniqueName]);

    return (
        <div className="pl-[calc(50%-642px)] pr-[calc(50%-642px)]">
            <ChannelSection channel={channel} />
            <VideoSection videos={videos} />
        </div>
    );
};

export default MainSection;
