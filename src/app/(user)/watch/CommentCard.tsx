import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MessageSquare, Pencil, Trash2 } from 'lucide-react';
import CommentInput from '@/app/(user)/watch/CommentInput';
import LikeDislikeButton from './LikeDislikeButton';
import { formatUploadTime } from '@/lib/utils';
import { Comment } from '@/types';
import { useUserStore } from '@/stores';
import {
    createReply,
    deleteComment,
    getCommentReplies,
    updateComment,
} from '@/apiRequests/comment';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface CommentCardProps {
    comment: Comment;
    videoId: string;
    onEdit: (comment: Comment) => void;
    onDelete: (id: string) => void;
}

export default function CommentCard({ comment, videoId, onEdit, onDelete }: CommentCardProps) {
    const { toast } = useToast();
    const { profile } = useUserStore();
    const [showReply, setShowReply] = useState(false);
    const [replying, setReplying] = useState(false);
    const [replies, setReplies] = useState<Comment[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleFetchReplies = async () => {
        if (!showReply) {
            const data = await getCommentReplies(comment._id);
            const nestedReplies = await Promise.all(
                data.map(async (reply) => ({
                    ...reply,
                    replies: await getCommentReplies(reply._id),
                })),
            );

            setReplies(nestedReplies);
            setShowReply(true);
        } else {
            setShowReply(false);
        }
    };

    const handleCreateReply = async (content: string) => {
        const newReply = await createReply({
            parentId: comment._id,
            videoId,
            content,
        });
        await handleFetchReplies();

        setReplies((prev) => [...prev, newReply]);
        setReplying(false);
        setShowReply(true);
    };

    const handleDelete = async () => {
        const { success } = await deleteComment(comment._id);
        onDelete(comment._id);
        await handleFetchReplies();

        setOpenDialog(false);
        if (success) {
            toast({
                description: 'Thành công',
            });
        }
    };

    const handleEditComment = async (content: string) => {
        const updated = await updateComment(comment._id, content);
        onEdit(updated);

        await handleFetchReplies();
        setIsEditing(false);

        toast({
            description: 'Thành công',
        });
    };

    return (
        <div className="my-2 flex w-full max-w-sm flex-col space-y-4 md:max-w-full">
            <div className="flex space-x-4">
                <Avatar>
                    <AvatarImage src={comment.user.avatarUrl} alt={comment.user.fullName} />
                    <AvatarFallback>
                        {comment.user.fullName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">{comment.user.fullName}</span>
                        <span className="text-sm text-gray-500">
                            {formatUploadTime(comment.createdAt)}
                        </span>
                    </div>
                    {profile && isEditing ? (
                        <EditCommentInput
                            comment={comment}
                            onSubmit={handleEditComment}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <p className="mt-1 text-sm text-foreground">{comment.content}</p>
                    )}
                    {!isEditing && (
                        <div className="mt-2 items-center space-x-4 md:flex">
                            <LikeDislikeButton
                                initialLikes={comment.likesCount}
                                initialDislikes={comment.dislikesCount}
                                variant="ghost"
                                targetType="comment"
                                targetId={comment._id}
                            />
                            <div className="flex">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setReplying(!replying)}
                                >
                                    <MessageSquare size={16} className="mr-1" /> Trả lời
                                </Button>
                                {profile?._id === comment.user._id && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsEditing(!isEditing)}
                                        >
                                            <Pencil size={16} className="mr-1" /> Chinh sửa
                                        </Button>
                                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <Trash2 /> Xóa
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Xóa bình luận</DialogTitle>
                                                    <DialogDescription>
                                                        Bạn có chắc chắn muốn xóa bình luận này
                                                        không?
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setOpenDialog(false)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button onClick={handleDelete}>Xóa</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {profile && replying && (
                        <CommentInput
                            initialIsWriting
                            avatar={profile.avatarUrl}
                            name={profile?.fullName || profile.email}
                            onSubmit={handleCreateReply}
                            onCancel={() => setReplying(false)}
                        />
                    )}
                    {comment.repliesCount > 0 && (
                        <button
                            onClick={handleFetchReplies}
                            className="flex items-center text-sm text-blue-500"
                        >
                            {showReply ? <ChevronUp /> : <ChevronDown />}{' '}
                            <span>{comment.repliesCount} phản hồi</span>
                        </button>
                    )}
                    {showReply && replies && replies.length > 0 && (
                        <div className="mt-4 space-y-2 border-l-2 pl-4">
                            {replies.map((reply) => (
                                <CommentCard
                                    key={reply._id}
                                    comment={reply}
                                    videoId={videoId}
                                    onEdit={(updated: Comment) => {
                                        setReplies((prev) =>
                                            prev.map((r) => (r._id === updated._id ? updated : r)),
                                        );
                                    }}
                                    onDelete={(id: string) =>
                                        setReplies((prev) => prev.filter((r) => r._id !== id))
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface EditCommentInputProps {
    comment: Comment;
    onSubmit: (content: string) => void;
    onCancel: () => void;
}
function EditCommentInput({
    comment: { content: initialContent },
    onSubmit,
    onCancel,
}: EditCommentInputProps) {
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(initialContent);
    }, []);

    const handleSubmit = () => {
        if (content.trim()) {
            onSubmit(content);
            setContent('');
        }
    };

    const handleCancel = () => {
        if (typeof onCancel === 'function') {
            onCancel();
        }
    };

    return (
        <div className="flex flex-1 flex-col space-y-2 py-4">
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết bình luận..."
                className="resize-none"
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={handleCancel} className="rounded-3xl">
                    Hủy
                </Button>
                <Button
                    variant="default"
                    className="hover:bg-[#3ea6ff rounded-3xl bg-[#3ea6ff] text-background hover:opacity-80 disabled:bg-[#272727]"
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                >
                    Bình luận
                </Button>
            </div>
        </div>
    );
}
