import { useEffect, useState } from 'react';
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

type CreatePlaylistModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (title: string, visibility: 'public' | 'private') => void;
};

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [visibility, setVisibility] = useState<'public' | 'private'>('private');

    useEffect(() => {
        return () => {
            setTitle('');
            setVisibility('private');
        };
    }, [isOpen]);

    const handleCreate = () => {
        if (title.trim()) {
            onCreate(title, visibility);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Danh sách phát mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Nhập tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <Button onClick={handleCreate}>Tạo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePlaylistModal;
