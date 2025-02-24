'use client';

import React, { useEffect, useMemo, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import PlaylistVideo from '@/app/(user)/watch/PlaylistVideo';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePlaylistStore } from '@/stores/playlist.store';
import { Video } from '@/types';
import { getVideosByCategory } from '@/apiRequests';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserStore } from '@/stores';

const RightSection = ({ className }: { className?: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const list = searchParams.get('list');
    const { playlists } = usePlaylistStore();
    const { profile } = useUserStore();
    const [videos, setVideos] = useState<Video[]>([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        (async () => {
            const res = await getVideosByCategory('music');
            setVideos(res);
        })();
    }, []);

    const selectedPlaylist = useMemo(() => {
        if (list) {
            if (list === 'LL') {
                return playlists.find((playlist) => !playlist.removable);
            } else {
                const playlist = playlists.find((playlist) => playlist._id === list);
                if (!playlist) return router.push('/');
                return playlist;
            }
        }
    }, [list]);

    return (
        <div className={className}>
            {list &&
                (list === 'LL' ? (
                    profile && (
                        <PlaylistVideo
                            title="Video đã thích"
                            owner={profile?.fullName || profile.email}
                            videos={videos}
                        />
                    )
                ) : (
                    <PlaylistVideo
                        title={selectedPlaylist?.title as string}
                        owner={selectedPlaylist?.owner as string}
                        videos={selectedPlaylist?.videos as Video[]}
                    />
                ))}
            <div className="mx-auto flex max-w-2xl flex-col gap-10 md:max-w-3xl md:gap-4">
                {videos.map((video) => (
                    <VideoCard
                        key={video._id}
                        video={video}
                        hasAvatar={false}
                        orientation={isMobile ? 'vertical' : 'horizontal'}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(RightSection);
