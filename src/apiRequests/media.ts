import customAxios from '@/lib/axios';

export const uploadImage = async (file: File): Promise<{ url: string; secure_url: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const res = await customAxios.post(`/media/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data.data;
    } catch (error) {
        return { url: '', secure_url: '' };
    }
};
