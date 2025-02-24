'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowUpFromLine, TriangleAlert } from 'lucide-react';
import customAxios from '@/lib/axios';
import { AxiosProgressEvent } from 'axios';
import VideoUploadModal from './VideoUploadModal';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@/lib/utils';

type PickVideoModalProps = {
    open: boolean;
    onClose: () => void;
};

const PickVideoModal = ({ open, onClose }: PickVideoModalProps) => {
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (selectedFile: File | null) => {
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith('video/')) {
            setFileError(true);
            return;
        }

        const validExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.webm'];
        const fileExtension = selectedFile.name
            .slice(selectedFile.name.lastIndexOf('.'))
            .toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            setFileError(true);
            return;
        }

        setFile(selectedFile);
    };

    useEffect(() => {
        if (!file) return;

        const uploadFile = async () => {
            setIsUploading(true);
            setProgress(0);

            const formData = new FormData();
            formData.append('video', file);

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    const percent =
                        Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1)) - 5;
                    setProgress(percent);
                },
            };

            try {
                const axiosRes = await customAxios.post('/media/upload/video', formData, config);
                const serverRes = axiosRes.data;

                if (serverRes?.statusCode === 200 && serverRes?.status === 'success') {
                    const videoId = serverRes.data.publicId;
                    const fileName = file.name.split('.')[0];

                    setItemToLocalStorage('video-upload-public-id', videoId);
                    setItemToLocalStorage('video-upload-name', fileName);
                }

                setTimeout(() => {
                    setProgress(100);
                    handleCloseModal();
                }, 5000);
            } catch (error) {
                console.error('Upload failed:', error);
                setIsUploading(false);
            }
        };

        uploadFile();
    }, [file]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const handleCloseModal = () => {
        if (isUploading) return;

        setFile(null);
        setIsUploading(false);
        setFileError(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        onClose();
        if (getItemFromLocalStorage('video-upload-public-id')) {
            setOpenUploadModal(true);
        }
    };

    const handleCloseUploadModal = () => {
        setOpenUploadModal(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleCloseModal}>
                <DialogContent className="h-auto max-w-sm bg-[#272727] p-6 md:max-w-2xl lg:min-h-[calc(100vh-100px)] lg:max-w-4xl">
                    <h2 className="text-xl font-semibold">Tải video lên</h2>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <motion.div
                            className="relative mb-4 mt-4 flex w-full cursor-pointer flex-col items-center justify-center"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <p className="mx-auto mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-[#1f1f1f] p-6 text-[#aaa]">
                                    <ArrowUpFromLine size={40} />
                                </p>
                            </div>
                        </motion.div>

                        <p className="font-medium text-foreground">
                            Kéo và thả tệp video để tải lên
                        </p>
                        <p className="text-xs text-[#aaa]">
                            Các video của bạn sẽ ở chế độ riêng tư cho đến khi bạn xuất bản.
                        </p>

                        <input
                            type="file"
                            accept="video/*"
                            ref={fileInputRef}
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) => {
                                if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
                            }}
                        />

                        {fileError && (
                            <p className="mx-auto flex h-5 items-center gap-2 text-sm text-white">
                                <TriangleAlert color="#ff8983" />
                                Định dạng tệp không hợp lệ.
                                <span className="cursor-pointer text-[#3ea6ff]">
                                    {' '}
                                    Tìm hiểu thêm
                                </span>
                            </p>
                        )}
                    </div>

                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="mx-auto max-w-min rounded-3xl text-background"
                        disabled={isUploading}
                    >
                        Chọn tệp
                    </Button>

                    <AnimatePresence>
                        {isUploading && (
                            <motion.div
                                className="mx-52 mt-4"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Progress value={progress} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <DialogFooter>
                        <div className="flex w-full flex-col items-center justify-center">
                            <p className="text-xs text-[#aaa]">
                                Khi gửi video lên YouTube, bạn xác nhận rằng bạn đồng ý với
                                <span className="cursor-pointer text-[#3ea6ff]">
                                    {' '}
                                    Điều khoản dịch vụ
                                </span>{' '}
                                và
                                <span className="cursor-pointer text-[#3ea6ff]">
                                    {' '}
                                    Nguyên tắc cộng đồng của YouTube.
                                </span>
                            </p>
                            <p className="text-xs text-[#aaa]">
                                Bạn cần đảm bảo không vi phạm bản quyền hoặc quyền riêng tư của
                                người khác.{' '}
                                <span className="cursor-pointer text-[#3ea6ff]">Tìm hiểu thêm</span>
                            </p>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <VideoUploadModal open={openUploadModal} onClose={handleCloseUploadModal} />
        </>
    );
};

export default PickVideoModal;
