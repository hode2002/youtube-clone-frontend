import { useEffect, useMemo, useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dislike, checkUserLiked, like, removeDislike, removeLike } from '@/apiRequests';
import { usePlaylistStore, useUserStore } from '@/stores';
import { useToast } from '@/hooks/use-toast';
import { useAddVideoToPlaylist, useRemoveVideoFromPlaylist } from '@/hooks/useFetchPlaylists';

interface LikeDislikeProps {
    initialLikes?: number;
    initialDislikes?: number;
    variant?: 'outline' | 'ghost';
    targetType: 'video' | 'comment';
    targetId: string;
}

export default function LikeDislikeButton({
    initialLikes = 0,
    initialDislikes = 0,
    variant = 'outline',
    targetType,
    targetId,
}: LikeDislikeProps) {
    const { toast } = useToast();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [isLoading, setIsLoading] = useState(false);
    const { profile } = useUserStore();
    const { playlists } = usePlaylistStore();
    const { mutate: addVideo } = useAddVideoToPlaylist();
    const { mutate: removeVideo } = useRemoveVideoFromPlaylist();

    const selectedPlaylist = useMemo(() => playlists.find((p) => !p.removable), []);

    useEffect(() => {
        if (!targetId || !targetType) return;

        (async () => {
            const res = await checkUserLiked(targetType, targetId);

            if (res) {
                setLiked(res.type === 'like');
                setDisliked(res.type === 'dislike');
            } else {
                setLiked(false);
                setDisliked(false);
            }
        })();
    }, [targetId, targetType]);

    const handleLike = async () => {
        if (!profile) {
            toast({ description: 'Vui lòng đăng nhập để tiếp tục' });
            return;
        }

        setIsLoading(true);

        if (liked) {
            setLikes((prev) => prev - 1);
            await removeLike(targetType, targetId);
            if (targetType === 'video') {
                removeVideo({ playlistId: selectedPlaylist!._id, videoId: targetId });
            }
        } else {
            if (disliked) {
                setDisliked(false);
                setDislikes((prev) => prev - 1);
                await removeDislike(targetType, targetId);
            }

            setLikes((prev) => prev + 1);
            await like(targetType, targetId);
            if (targetType === 'video') {
                addVideo({ playlistId: selectedPlaylist!._id, videoId: targetId });
            }
        }
        setLiked(!liked);
        setIsLoading(false);
    };

    const handleDislike = async () => {
        if (!profile) {
            toast({ description: 'Vui lòng đăng nhập để tiếp tục' });
            return;
        }

        setIsLoading(true);

        if (disliked) {
            setDislikes((prev) => prev - 1);
            await removeDislike(targetType, targetId);
        } else {
            if (liked) {
                setLiked(false);
                setLikes((prev) => prev - 1);
                await removeLike(targetType, targetId);
                if (targetType === 'video') {
                    removeVideo({ playlistId: selectedPlaylist!._id, videoId: targetId });
                }
            }

            setDislikes((prev) => prev + 1);
            await dislike(targetType, targetId);
        }
        setDisliked(!disliked);
        setIsLoading(false);
    };

    return (
        <div className="flex items-center px-0">
            <Button
                onClick={handleLike}
                variant={variant}
                className="flex items-center space-x-1 rounded-l-3xl"
                disabled={isLoading}
            >
                <ThumbsUp
                    size={20}
                    className={liked ? 'fill-current text-foreground' : 'text-foreground'}
                />
                <span>{likes}</span>
            </Button>
            <Button
                onClick={handleDislike}
                variant={variant}
                className="flex items-center space-x-1 rounded-r-3xl"
                disabled={isLoading}
            >
                <ThumbsDown
                    size={20}
                    className={disliked ? 'fill-current text-foreground' : 'text-foreground'}
                />
                <span>{dislikes}</span>
            </Button>
        </div>
    );
}
