import { Channel } from '@/types';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dot } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import ChannelCard from '@/components/ChannelCard';
import { useIsMobile } from '@/hooks/use-mobile';

type ChannelSectionProps = {
    channel: Channel | null;
};
export default function ChannelSection({ channel }: ChannelSectionProps) {
    const isMobile = useIsMobile();
    return (
        <div className="mb-8">
            <div className="relative mb-4 h-32 w-full md:h-52">
                {channel?.banner ? (
                    <Image
                        src={channel.banner}
                        fill
                        quality={100}
                        className="rounded-2xl object-cover"
                        alt={channel.name}
                    />
                ) : (
                    <Skeleton className="h-full rounded-2xl" />
                )}
            </div>
            <div className="mx-4 flex gap-2 md:mx-0">
                <div className="h-32 w-32">
                    {channel?.avatarUrl ? (
                        <Avatar className="h-full w-full">
                            <AvatarImage src={channel.avatarUrl} alt={channel.name} />
                            <AvatarFallback>{channel.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    ) : (
                        <Avatar className="h-full w-full">
                            <Skeleton className="h-full w-full" />
                        </Avatar>
                    )}
                </div>
                <div className="pl-2">
                    {channel?.name ? (
                        <div className="text-3xl font-bold text-foreground">{channel.name}</div>
                    ) : (
                        <Skeleton className="h-9" />
                    )}
                    {channel ? (
                        <>
                            <div className="block items-center text-sm text-[#aaa] md:flex">
                                <div className="text-white">{channel.uniqueName}</div>
                                {!isMobile && <Dot />}
                                <div className="flex">
                                    <div>
                                        {formatNumber({
                                            number: channel.subscribersCount,
                                            notation: 'compact',
                                            compactDisplay: 'long',
                                            suffix: 'người đăng ký',
                                        })}
                                    </div>
                                    <Dot />
                                    <div>
                                        {formatNumber({
                                            number: channel.videosCount,
                                            notation: 'compact',
                                            compactDisplay: 'long',
                                            suffix: 'video',
                                        })}
                                    </div>
                                </div>
                            </div>
                            <ChannelCard channel={channel} showBtnOnly />
                        </>
                    ) : (
                        <>
                            <div className="flex items-center text-sm text-[#aaa]">
                                <Skeleton className="h-4 w-3/4" />
                                <Dot />
                                <Skeleton className="h-4 w-3/4" />
                                <Dot />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            <Skeleton className="h-9 w-40 rounded-full" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
