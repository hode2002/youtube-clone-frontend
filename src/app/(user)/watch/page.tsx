import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getVideoById } from '@/apiRequests';

import { Metadata } from 'next';
import LeftSection from '@/app/(user)/watch/LeftSection';
import RightSection from '@/app/(user)/watch/RightSection';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { v?: string };
}): Promise<Metadata> {
    const videoId = searchParams.v || '';
    const video = await getVideoById(videoId);

    return {
        title: video ? video.title : 'Video Not Found',
        description: video ? video.description : 'Không tìm thấy video',
    };
}

const WatchPage = () => {
    return (
        <ScrollArea className="h-[calc(100vh-72px)]">
            <div className="mx-auto gap-8 lg:grid lg:max-w-[1750px] lg:grid-cols-3">
                <LeftSection className="col-span-2" />
                <RightSection className="col-span-1" />
            </div>
        </ScrollArea>
    );
};

export default WatchPage;
