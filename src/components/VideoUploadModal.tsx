import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import copy from 'copy-to-clipboard';
import { Separator } from '@/components/ui/separator';
import { checkVideoStatus, createVideo, updateVideo, uploadImage } from '@/apiRequests';
import { useChannelStore, useUserStore } from '@/stores';
import { Skeleton } from '@/components/ui/skeleton';
import { UpdateVideo } from '@/types';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '@/lib/utils';

interface VideoUploadModalProps {
    open: boolean;
    onClose: () => void;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function VideoUploadModal({ open, onClose }: VideoUploadModalProps) {
    const { toast } = useToast();
    const fileName = getItemFromLocalStorage('video-upload-name') || '';
    const publicId = getItemFromLocalStorage('video-upload-public-id') || '';
    const [title, setTitle] = useState(fileName);
    const [videoId, setVideoId] = useState(publicId);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState<UpdateVideo>({
        title,
        privacy: 'private',
        category: 'blog',
    });
    const [isLoading, setIsLoading] = useState(true);
    const { profile } = useUserStore((state) => state);
    const { channel } = useChannelStore((state) => state);
    const [isThumbnailValid, setIsThumbnailValid] = useState(false);

    useEffect(() => {
        setTitle(fileName);
        setVideoId(publicId);
        setVideoUrl(null);
        setFormData((prev) => ({
            ...prev,
            title: fileName,
        }));
    }, [fileName, publicId]);

    useEffect(() => {
        if (!videoId) return;

        const checkUploadStatus = async () => {
            const { url, secure_url } = await checkVideoStatus(videoId);

            if (url && secure_url) {
                clearInterval(intervalId);
                setVideoUrl(url);

                if (profile && profile.role === 'CHANNEL' && channel && channel._id) {
                    await createVideo({
                        title: formData.title || title,
                        category: formData.category || 'blog',
                        videoId,
                        url: secure_url,
                        channel: channel._id,
                    });
                    handleLoading();
                }
            }
        };

        const intervalId = setInterval(checkUploadStatus, 10000);

        return () => clearInterval(intervalId);
    }, [videoId]);

    const handleLoading = () => {
        setIsLoading(false);
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCloseModal = () => {
        if (isLoading) return;

        toast({
            description: 'Video đã được lưu dưới dạng bản nháp',
        });

        if (fileName && publicId) {
            removeItemFromLocalStorage('video-upload-name');
            removeItemFromLocalStorage('video-upload-public-id');
        }

        onClose();
    };

    const onSubmit = async () => {
        if (!formData.title) {
            setFormData((prev) => ({
                ...prev,
                title: fileName,
            }));
        }

        if (!isThumbnailValid) {
            toast({
                description: 'Vui lòng chọn thumbnail cho video',
            });
            return;
        }

        await updateVideo(videoId, formData);

        toast({
            description: 'Video đã được tạo. Bạn có thể xem bất cứ lúc nào',
        });

        if (fileName && publicId) {
            removeItemFromLocalStorage('video-upload-name');
            removeItemFromLocalStorage('video-upload-public-id');
        }

        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="h-auto max-w-sm bg-[#272727] p-6 md:max-w-2xl lg:min-h-[calc(100vh-100px)] lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-screen md:h-auto">
                    <div className="flex grid-cols-12 flex-col-reverse content-between gap-6 overflow-scroll md:grid">
                        <LeftSection formData={formData} onChange={handleInputChange} />
                        <RightSection
                            fileName={title}
                            url={videoUrl ?? ''}
                            onChange={handleInputChange}
                            setIsThumbnailValid={setIsThumbnailValid}
                        />
                    </div>
                </ScrollArea>

                <Separator className="bg-[#aaa]" />

                <DialogFooter>
                    <Button className="rounded-3xl" onClick={onSubmit} disabled={isLoading}>
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

type LeftSectionProps = {
    formData: UpdateVideo;
    onChange: (name: string, value: string) => void;
};

const LeftSection = React.memo(({ formData, onChange }: LeftSectionProps) => {
    const [title, setTitle] = useState(formData?.title);
    const [privacy, setPrivacy] = useState('private');
    const [category, setCategory] = useState('blog');

    const validationSchema = Yup.object({
        title: Yup.string().required('Tiêu đề không được để trống'),
        description: Yup.string().max(5000, 'Mô tả tối đa 5000 ký tự'),
    });

    useEffect(() => {
        setTitle(formData.title || '');
    }, [formData]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const handlePrivacyChange = (value: string) => {
        onChange('privacy', value);
        setPrivacy(value);
    };

    const handleCategoryChange = (value: string) => {
        onChange('category', value);
        setCategory(value);
    };

    return (
        <div className="col-span-7 text-[#aaa]">
            <Formik
                initialValues={{ title, description: '' }}
                validationSchema={validationSchema}
                validateOnChange
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleChange, values }) => (
                    <Form className="mb-4 flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-white">Chi tiết</h1>

                        <div className="flex flex-col">
                            <label htmlFor="title" className="py-2 text-sm text-foreground">
                                Tiêu đề (bắt buộc)
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={values.title}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleFormChange(e);
                                }}
                                className="max-w-xs rounded-lg border border-[#aaa] bg-transparent px-2 py-4 text-sm text-foreground hover:border-white focus:outline-none focus:ring-0 md:max-w-full"
                                placeholder="Thêm tiêu đề để mô tả video của bạn"
                            />
                            <ErrorMessage
                                name="title"
                                component="p"
                                className="mt-1 text-sm text-destructive"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description" className="py-2 text-sm text-foreground">
                                Mô tả
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                value={values.description}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleFormChange(e);
                                }}
                                className="h-32 max-w-xs rounded-lg border border-[#aaa] bg-transparent px-2 py-4 text-sm text-foreground hover:border-white focus:outline-none focus:ring-0 md:max-w-full"
                                placeholder="Giới thiệu về video của bạn cho người xem"
                            />
                            <ErrorMessage
                                name="description"
                                component="p"
                                className="mt-1 text-sm text-destructive"
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mb-6 flex flex-col gap-2">
                <Label className="text-lg font-semibold text-white">Danh mục</Label>
                <Select onValueChange={handleCategoryChange} value={category}>
                    <SelectTrigger className="max-w-xs rounded-lg border border-[#aaa] hover:border-white">
                        <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blog">Mọi người và du lịch</SelectItem>
                        <SelectItem value="music">Âm nhạc</SelectItem>
                        <SelectItem value="gaming">Trò chơi</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mb-6 flex flex-col gap-2">
                <Label className="text-lg font-semibold text-white">Quyền riêng tư</Label>
                <RadioGroup defaultValue={privacy} onValueChange={handlePrivacyChange}>
                    <div className="flex items-start space-x-2 px-2 py-1">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private" className="flex cursor-pointer flex-col gap-1">
                            <span className="font-semibold text-white">Riêng tư</span>
                            <span>Chỉ bạn mới xem được video của bạn</span>
                        </Label>
                    </div>
                    <div className="flex items-start space-x-2 px-2 py-1">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="flex cursor-pointer flex-col gap-1">
                            <span className="font-semibold text-white">Công khai</span>
                            <span>Mọi người đều xem được video của bạn</span>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
});

type RightSectionProps = {
    fileName: string;
    url: string;
    onChange: (name: string, value: string) => void;
    setIsThumbnailValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const RightSection = React.memo(
    ({ fileName, url, onChange, setIsThumbnailValid }: RightSectionProps) => {
        const { toast } = useToast();
        const [title, setTitle] = useState(fileName);
        const playerRef = useRef<ReactPlayer | null>(null);
        const publicId = getItemFromLocalStorage('video-upload-public-id') || '';
        const [videoId, setVideoId] = useState(publicId);
        const [videoUrl, setVideoUrl] = useState<string | null>(null);
        const [thumbnail, setThumbnail] = useState<string | null>(null);

        useEffect(() => {
            setTitle(fileName);
            setVideoId(publicId);
            setVideoUrl(url);
            setThumbnail(null);
        }, [fileName, publicId, url]);

        const handleCopy = (url: string) => {
            copy(url);
            toast({
                description: 'Đã sao chép đường liên kết vào bảng nhớ tạm',
            });
        };

        const handleThumbnailChange = (newThumb: string) => {
            setThumbnail(newThumb);
            onChange('thumbnail', newThumb);
        };

        return (
            <div className="col-span-5 mt-12">
                <AspectRatio ratio={16 / 9} className="flex items-center justify-center">
                    {thumbnail ? (
                        <img
                            src={thumbnail}
                            alt="Thumbnail"
                            className="h-full w-full cursor-pointer rounded-t-lg object-cover"
                        />
                    ) : videoUrl ? (
                        <ReactPlayer
                            ref={playerRef}
                            url={videoUrl}
                            muted
                            controls
                            width="100%"
                            height="100%"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-[#1f1f1f] bg-opacity-70 text-sm text-[#aaa]">
                            <p>Đang xử lý</p>
                        </div>
                    )}
                </AspectRatio>
                <div className="max-w-xs rounded-b-lg bg-[#1f1f1f] p-4 md:max-w-full">
                    <p className="my-2">{title}</p>
                    <div className="flex items-center justify-between text-sm text-[#aaa]">
                        <div className="flex w-3/4 flex-col justify-between gap-2">
                            <p>Đường liên kết của video</p>
                            {videoUrl ? (
                                <Link
                                    href={`${baseUrl}/watch?v=${videoId}`}
                                    target="_blank"
                                    className="truncate text-[#3ea6ff]"
                                >
                                    {`${baseUrl}/watch?v=${videoId}`}
                                </Link>
                            ) : (
                                <Skeleton className="h-4 w-[250px]" />
                            )}
                        </div>
                        {videoUrl && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="cursor-pointer rounded-full p-3 hover:bg-[#272727]">
                                        <Copy
                                            color="#fff"
                                            onClick={() =>
                                                handleCopy(`${baseUrl}/watch?v=${videoId}`)
                                            }
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Sao chép đường liên kết của video</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>

                <UploadThumbnailForm
                    onChange={handleThumbnailChange}
                    onValidate={setIsThumbnailValid}
                />
            </div>
        );
    },
);

const validationSchema = Yup.object().shape({
    thumbnail: Yup.mixed().required('Vui lòng chọn hình thu nhỏ'),
});

type UploadThumbnailFormProps = {
    onChange: (newThumb: string) => void;
    onValidate: React.Dispatch<React.SetStateAction<boolean>>;
};
const UploadThumbnailForm = ({ onChange, onValidate }: UploadThumbnailFormProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const submitBtnRef = useRef<HTMLButtonElement | null>(null);

    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!thumbnail || !file || isLoading) {
            submitBtnRef.current?.click();
            onValidate(false);
            return;
        }

        (async () => {
            setIsLoading(true);
            const { secure_url } = await uploadImage(file as File);
            onChange(secure_url);
            setIsLoading(false);
        })();

        onValidate(!!thumbnail);
    }, [thumbnail]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const thumb = URL.createObjectURL(file);
            setThumbnail(thumb);
            setFieldValue('thumbnail', file);
            setFile(file);
        }
    };

    return (
        <Formik
            initialValues={{ thumbnail: null }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('Form submitted with:', values);
            }}
        >
            {({ setFieldValue }) => (
                <Form>
                    <p
                        className="mt-8 pb-2 text-sm text-foreground"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Hình thu nhỏ
                    </p>

                    <div className="relative">
                        <div
                            className="flex cursor-pointer flex-col items-start justify-start gap-2"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Image
                                src={
                                    thumbnail ||
                                    (process.env.NEXT_PUBLIC_DEFAULT_VIDEO_THUMBNAIL as string)
                                }
                                alt="Thumbnail"
                                width={200}
                                height={200}
                                className={`rounded-lg ${isLoading && 'opacity-50'}`}
                            />
                        </div>

                        <ErrorMessage
                            name="thumbnail"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                        />
                    </div>

                    <input
                        disabled={isLoading}
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleThumbnailChange(e, setFieldValue)}
                        className="hidden"
                    />

                    <button type="submit" ref={submitBtnRef} hidden />
                </Form>
            )}
        </Formik>
    );
};
