import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore, useChannelStore, useUserStore } from '@/stores';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { createChannel, getUserProfile, refreshToken, uploadImage } from '@/apiRequests';

const defaultAvatar = process.env.NEXT_PUBLIC_DEFAULT_AVATAR;

type CreateChannelModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateChannelModal = ({ open, setOpen }: CreateChannelModalProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [uniqueName, setUniqueName] = useState('@');
    const [isLoading, setIsLoading] = useState(false);

    const { setAccessToken } = useAuthStore();
    const { profile, setProfile } = useUserStore();
    const { setChannel } = useChannelStore();

    useEffect(() => {
        if (!profile) return;

        setName(profile?.fullName || '');
        setAvatar(profile.avatarUrl);
        setUniqueName(profile.username);
    }, [open]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file) as string);
            setFile(file);
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
        setAvatar(null);
        setName('');
        setUniqueName('@');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (name: string, uniqueName: string) => {
        console.log({ name, avatar, uniqueName });
        if (!name || !uniqueName || uniqueName.length === 1) return;

        if (!profile) {
            toast({
                description: 'Có lỗi xảy ra, vui lòng thử lại sau',
            });
            return;
        }

        setIsLoading(true);

        let avatarUrl = avatar ?? defaultAvatar;
        if (file) {
            const { secure_url } = await uploadImage(file);
            avatarUrl = secure_url;
        }

        const channel = await createChannel({
            name,
            uniqueName,
            avatarUrl,
            owner: profile._id,
        });

        setChannel(channel);

        const newAccessToken = await refreshToken();
        if (newAccessToken) setAccessToken(newAccessToken);
        const user = await getUserProfile();
        setProfile(user);

        handleCloseModal();

        router.push('/studio?video=up');
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Cách bạn sẽ xuất hiện</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={avatar || defaultAvatar} alt="Avatar" />
                        <AvatarFallback>
                            {profile?.fullName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Label htmlFor="avatar" className="cursor-pointer">
                        <Button variant="outline" asChild disabled={isLoading}>
                            <span>Chọn ảnh</span>
                        </Button>
                        <Input
                            id="avatar"
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isLoading}
                        />
                    </Label>
                </div>
                <CreateForm
                    isLoading={isLoading}
                    name={name}
                    uniqueName={uniqueName}
                    handleCloseModal={handleCloseModal}
                    handleSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
};

const validationSchema = Yup.object({
    name: Yup.string().required('Tên không được để trống'),
    uniqueName: Yup.string().required('Tên người dùng không được để trống'),
});

type CreateFormProps = {
    isLoading: boolean;
    name: string;
    uniqueName: string;
    handleCloseModal: () => void;
    handleSubmit: (name: string, uniqueName: string) => void;
};
const CreateForm = ({
    isLoading,
    name,
    uniqueName,
    handleCloseModal,
    handleSubmit,
}: CreateFormProps) => {
    return (
        <>
            <Formik
                initialValues={{ name, uniqueName }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Form data:', values);
                    handleSubmit(values.name, values.uniqueName);
                }}
            >
                {({ handleChange, values }) => (
                    <Form className="space-y-4">
                        <div>
                            <Label htmlFor="name">Tên</Label>
                            <Field
                                as={Input}
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Nhập tên"
                            />
                            <ErrorMessage
                                name="name"
                                component="p"
                                className="my-2 text-sm text-red-500"
                            />
                        </div>
                        <div>
                            <Label htmlFor="uniqueName">Tên người dùng</Label>
                            <Field
                                as={Input}
                                id="uniqueName"
                                name="uniqueName"
                                value={values.uniqueName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    if (!value.startsWith('@')) return;
                                    handleChange(e);
                                }}
                                placeholder="Nhập tên người dùng"
                            />
                            <ErrorMessage
                                name="uniqueName"
                                component="p"
                                className="my-2 text-sm text-red-500"
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleCloseModal}>
                                Hủy
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                Tạo kênh
                            </Button>
                        </DialogFooter>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateChannelModal;
