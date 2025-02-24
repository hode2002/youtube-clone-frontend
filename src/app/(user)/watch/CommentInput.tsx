import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentInputProps {
    initialIsWriting?: boolean;
    avatar: string;
    name: string;
    onSubmit: (content: string) => void;
    onCancel?: () => void;
}

export default function CommentInput({
    initialIsWriting = false,
    avatar,
    name,
    onCancel,
    onSubmit,
}: CommentInputProps) {
    const [isWriting, setIsWriting] = useState(initialIsWriting);
    const [content, setContent] = useState('');

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
        setIsWriting(false);
    };

    return (
        <div className="flex w-full items-start space-x-4 py-4">
            <Avatar>
                <AvatarImage src={avatar} alt="User Avatar" />
                <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col space-y-2">
                <Textarea
                    value={content}
                    onClick={() => setIsWriting(true)}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết bình luận..."
                    className="max-w-xs resize-none md:max-w-full"
                />
                {isWriting && (
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
                )}
            </div>
        </div>
    );
}
