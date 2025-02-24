'use client';
import MediaThemeYt from 'player.style/yt/react';

const VideoPlayer = ({ url, className }: { url: string; className?: string; time?: number }) => {
    return (
        <MediaThemeYt className={`aspect-video h-auto w-full md:rounded-3xl ${className}`}>
            <video
                slot="media"
                src={url}
                playsInline
                className="aspect-video h-auto w-full md:rounded-3xl"
            ></video>
        </MediaThemeYt>
    );
};

export default VideoPlayer;
