'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Video } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { getVideoForOwner } from '@/apiRequests';
import VideoRow from '@/app/studio/VideoRow';
import { RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const VideoTable = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    const getVideos = useCallback(async () => {
        return await getVideoForOwner();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getVideos();
            setVideos(res);
        })();
    }, []);

    const handleRefresh = async () => {
        const res = await getVideos();
        setVideos(res);
    };

    return (
        <div className="px-4">
            <h1 className="flex justify-between py-4 text-2xl font-bold">
                Nội dung của kênh
                <Tooltip>
                    <TooltipTrigger asChild>
                        <RefreshCw className="cursor-pointer p-1" onClick={handleRefresh} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Tải video</p>
                    </TooltipContent>
                </Tooltip>
            </h1>
            <ScrollArea className="h-[calc(100vh-168px)]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] text-nowrap">
                                <span className="text-nowrap md:sr-only">Hình ảnh</span>
                            </TableHead>
                            <TableHead className="text-nowrap">Video</TableHead>
                            <TableHead className="text-nowrap">Chế độ hiển thị</TableHead>
                            <TableHead className="text-nowrap">Ngày đăng</TableHead>
                            <TableHead className="text-nowrap">Số lượt xem</TableHead>
                            <TableHead className="text-nowrap">Số bình luận</TableHead>
                            <TableHead className="text-nowrap">Lượt thích</TableHead>
                            <TableHead className="text-nowrap">Lượt không thích</TableHead>
                        </TableRow>
                    </TableHeader>
                    {videos && videos.length > 0 && (
                        <TableBody>
                            {videos.map((item, index) => (
                                <VideoRow key={index} video={item} />
                            ))}
                        </TableBody>
                    )}
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
};

export default VideoTable;
