import React from 'react';

interface Video {
    id: number;
    title: string;
    channel: string;
    thumbnail: string;
}

interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h2 className="font-bold">{video.title}</h2>
                <p className="text-gray-600">{video.channel}</p>
            </div>
        </div>
    );
};

export default VideoCard;
