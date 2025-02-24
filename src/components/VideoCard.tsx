'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { Video } from '@/types';
import { Dot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { formatUploadTime, formatNumber } from '@/lib/utils';
import VerticalMenu from './VerticalMenu';
import { Skeleton } from '@/components/ui/skeleton';

type VideoItemProps = Video & { delay?: number };
type Orientation = 'vertical' | 'horizontal';

type VideoCardProps = {
    orientation?: Orientation;
    video: VideoItemProps;
    hasAvatar?: boolean /* only orientation = horizontal */;
    onRedirect?: (url: string) => void;
};

const VideoCard = ({
    video,
    orientation = 'vertical',
    hasAvatar = true,
    onRedirect,
}: VideoCardProps) => {
    const [isHover, setIsHover] = useState(false);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const {
        _id,
        title,
        thumbnail,
        videoId,
        url,
        viewsCount,
        createdAt,
        delay = 700,
        channel: { name, uniqueName, avatarUrl },
    } = video;
    const handleMouseEnter = useCallback(() => {
        hoverTimeout.current = setTimeout(() => setIsHover(true), delay);
    }, [delay]);

    const handleMouseLeave = useCallback(() => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        setIsHover(false);
    }, []);

    const handleRedirect = useCallback(
        (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, redirectUrl: string) => {
            if (typeof onRedirect === 'function') {
                return onRedirect(redirectUrl);
            }

            e.stopPropagation();
            router.push('/watch?v=' + videoId);
        },
        [onRedirect, router],
    );

    const formattedViewCount = useMemo(
        () => formatNumber({ number: viewsCount, suffix: 'lượt xem' }),
        [viewsCount],
    );
    const formattedUploadTime = useMemo(() => formatUploadTime(createdAt), [createdAt]);

    return (
        video && (
            <div
                onClick={(e) => handleRedirect(e, videoId)}
                className={`cursor-pointer items-start justify-start gap-2 overflow-hidden ${orientation === 'horizontal' && 'flex py-2'}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="aspect-video">
                    <VideoThumbnail
                        orientation={orientation}
                        hasAvatar={hasAvatar}
                        isHover={isHover}
                        thumbnail={thumbnail}
                        title={title}
                        url={url}
                    />
                </div>

                {/* Video description */}
                <div
                    className={`grid-cols-12 ${
                        orientation !== 'horizontal'
                            ? 'grid p-2'
                            : hasAvatar
                              ? 'flex px-4'
                              : 'grid px-2'
                    }`}
                >
                    {orientation === 'vertical' && (
                        <Avatar
                            onClick={(e) => {
                                handleRedirect(e, uniqueName);
                            }}
                            className="col-span-2"
                        >
                            <AvatarImage src={avatarUrl} loading="lazy" alt={uniqueName} />
                            <AvatarFallback>{uniqueName?.charAt(1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    )}

                    <div className={`col-span-9 text-sm`}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p
                                    className={`text-base font-bold ${
                                        orientation !== 'horizontal' ? 'truncate' : 'line-clamp-2'
                                    }`}
                                >
                                    {title}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{title}</p>
                            </TooltipContent>
                        </Tooltip>

                        <div className={`${hasAvatar && 'flex flex-col-reverse gap-2'}`}>
                            {hasAvatar && (
                                <p className={`line-clamp-3 text-sm text-[#aaa]`}>
                                    {video.description}
                                </p>
                            )}

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <p
                                        onClick={(e) => {
                                            handleRedirect(e, uniqueName);
                                        }}
                                        className="flex items-center gap-2 text-[#aaa] hover:text-white"
                                    >
                                        {orientation === 'horizontal' && hasAvatar && (
                                            <Avatar
                                                onClick={(e) => {
                                                    handleRedirect(e, uniqueName);
                                                }}
                                                className="col-span-2 h-6 w-6"
                                            >
                                                <AvatarImage src={avatarUrl} alt={uniqueName} />
                                                <AvatarFallback>
                                                    {uniqueName?.charAt(1).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <span>{name}</span>
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{name}</p>
                                </TooltipContent>
                            </Tooltip>

                            <div
                                className={`flex items-center text-nowrap text-[#aaa] ${orientation === 'horizontal' && 'text-xs'}`}
                            >
                                <p>{formattedViewCount}</p>
                                <Dot />
                                <p>{formattedUploadTime}</p>
                            </div>
                        </div>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                        <VerticalMenu variant="ghost" _videoId={_id} />
                    </div>
                </div>
            </div>
        )
    );
};

type VideoThumbnailProps = {
    orientation?: Orientation;
    hasAvatar?: boolean /* only orientation = horizontal */;
    isHover: boolean;
    thumbnail: string;
    title: string;
    url: string;
};

const VideoThumbnail = React.memo(
    ({
        orientation = 'vertical',
        hasAvatar = false,
        isHover,
        thumbnail,
        title,
        url,
    }: VideoThumbnailProps) => {
        return (
            <div className={`mb-1 rounded-3xl`}>
                {isHover ? (
                    <video
                        src={url}
                        className={`mx-auto rounded-3xl transition-all ${orientation === 'vertical' ? 'max-w-sm' : hasAvatar ? 'h-[216px] max-w-sm' : 'max-w-44'} ${isHover ? 'opacity-100' : 'opacity-0'}`}
                        autoPlay
                        muted
                        loop
                    />
                ) : thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={title}
                        loading="lazy"
                        className={`mx-auto aspect-video rounded-3xl transition-all ${orientation === 'vertical' ? 'max-w-sm' : hasAvatar ? 'h-[216px] max-w-sm' : 'max-w-44'} ${isHover ? 'opacity-0' : 'opacity-100'}`}
                    />
                ) : (
                    <Skeleton className="aspect-video rounded-3xl" />
                )}
            </div>
        );
    },
);

export default VideoCard;
