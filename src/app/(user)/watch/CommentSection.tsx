import { createComment, getVideoComments } from '@/apiRequests/comment';
import CommentCard from '@/app/(user)/watch/CommentCard';
import CommentInput from '@/app/(user)/watch/CommentInput';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores';
import { Comment } from '@/types';
import { useCallback, useEffect, useState } from 'react';

type CommentSectionProps = {
    _videoId: string;
};
export default function CommentSection({ _videoId }: CommentSectionProps) {
    const { profile } = useUserStore();
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getVideoComments(_videoId);
            setComments(data);
        })();
    }, [_videoId]);

    const addComment = useCallback((newComment: Comment) => {
        setComments((prev) => [newComment, ...prev]);
    }, []);

    const handleCreate = async (content: string) => {
        const newComment = await createComment({ videoId: _videoId, content });
        addComment(newComment);
    };

    const handleEdit = (updated: Comment) => {
        setComments((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
    };

    const handleDelete = (commentId: string) => {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
    };

    return (
        <div className="mt-6 max-w-sm pb-80 md:max-w-full">
            <p className="text-xl font-semibold">{comments.length} bình luận</p>

            {profile ? (
                <CommentInput
                    name={profile?.fullName || profile.email}
                    avatar={profile.avatarUrl}
                    onSubmit={handleCreate}
                />
            ) : (
                <Skeleton className="h-4" />
            )}

            {comments &&
                comments.length > 0 &&
                comments.map((comment) => (
                    <CommentCard
                        key={comment._id}
                        videoId={_videoId}
                        comment={comment}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
        </div>
    );
}
