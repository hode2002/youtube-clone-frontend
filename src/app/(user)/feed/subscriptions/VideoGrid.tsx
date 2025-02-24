import VideoCard from '@/components/VideoCard';
import { Video } from '@/types';

const VideoGrid = ({ videos }: { videos: Video[] }) => {
    return (
        <div className="mx-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos &&
                videos.map((video) => (
                    <VideoCard key={video._id} video={video} hasAvatar={false} />
                ))}
        </div>
    );
};

export default VideoGrid;
