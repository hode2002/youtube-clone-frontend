'use client';

import { updateVideo } from '@/apiRequests';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { formatUploadTime } from '@/lib/utils';
import { Video, VideoPrivacy } from '@/types';
import { Earth, LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const VideoRow = ({ video }: { video: Video }) => {
    const { toast } = useToast();

    useEffect(() => {
        setVisibility(video.privacy);
    }, []);

    const [visibility, setVisibility] = useState<VideoPrivacy>('private');
    const formattedUploadTime = useMemo(() => formatUploadTime(video.createdAt), [video]);

    const handleUpdate = useCallback(
        async (privacy: VideoPrivacy) => {
            setVisibility(privacy);
            await updateVideo(video.videoId, { privacy });
            toast({
                description: 'Thành công',
            });
        },
        [video],
    );

    return (
        <TableRow>
            <TableCell className="flex items-center space-x-2">
                {video.thumbnail ? (
                    <Image
                        src={video.thumbnail}
                        alt={video.title}
                        className="aspect-video rounded-3xl object-cover"
                        height="200"
                        width="200"
                    />
                ) : (
                    <Skeleton className="aspect-video h-1/6 rounded-3xl" />
                )}
            </TableCell>
            <TableCell className="max-w-52 text-nowrap font-medium capitalize">
                <p className="truncate">{video.title}</p>
                <p className="truncate text-[#aaa]">{video.description}</p>
            </TableCell>
            <TableCell>
                <Select onValueChange={handleUpdate} value={visibility}>
                    <SelectTrigger className="w-[170px]" defaultChecked>
                        {visibility === 'public' ? <Earth /> : <LockKeyhole />}
                        <SelectValue
                            placeholder={visibility === 'private' ? 'Công khai' : 'Riêng tư'}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="private">Riêng tư</SelectItem>
                            <SelectItem value="public">Công khai</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell className="text-nowrap">{formattedUploadTime}</TableCell>
            <TableCell className="text-center">{video.viewsCount}</TableCell>
            <TableCell className="text-center">{video.commentsCount}</TableCell>
            <TableCell className="text-center">{video.likesCount}</TableCell>
            <TableCell className="text-center">{video.dislikesCount}</TableCell>
        </TableRow>
    );
};

export default React.memo(VideoRow);
