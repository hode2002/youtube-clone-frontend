import customAxios from '@/lib/axios';

export const getVideos = async () => {
    try {
        const res = await customAxios.get('/videos/channel/@deb2014557');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
