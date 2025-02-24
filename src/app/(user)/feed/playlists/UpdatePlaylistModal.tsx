import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Playlist, UpdatePlaylist } from '@/types';
import { Textarea } from '@/components/ui/textarea';

type UpdatePlaylistModalProps = {
    playlist: Playlist;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (id: string, newPlaylist: UpdatePlaylist) => void;
};

const UpdatePlaylistModal = ({ playlist, isOpen, onClose, onUpdate }: UpdatePlaylistModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState<'public' | 'private'>('private');

    useEffect(() => {
        setTitle(playlist.title);
        setDescription(playlist.description);
        setVisibility(playlist.visibility);
    }, [isOpen]);

    const handleUpdate = () => {
        if (title.trim()) {
            onUpdate(playlist._id, { title, description, visibility });
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Cập nhật <span className="capitalize">{title}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tiêu đề"
                    />
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-32 rounded-lg border border-[#aaa] bg-transparent px-2 py-4 text-sm text-foreground hover:border-white focus:outline-none focus:ring-0"
                        placeholder="Mô tả"
                    />
                    <Select
                        value={visibility}
                        onValueChange={(value) => setVisibility(value as 'public' | 'private')}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chế độ hiển thị" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="private">Riêng tư</SelectItem>
                            <SelectItem value="public">Công khai</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleUpdate}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(UpdatePlaylistModal);
