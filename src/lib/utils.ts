import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatViews(
    views: number,
    notation: 'standard' | 'compact' = 'compact',
    compactDisplay: 'short' | 'long' = 'short',
) {
    return (
        new Intl.NumberFormat('vi-VN', {
            notation,
            compactDisplay,
        }).format(views) + ' lượt xem'
    );
}

export function formatUploadTime(date: string) {
    return moment(date).fromNow().replace('một', '1');
}

export function getItemFromLocalStorage(key: string) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
}

export function setItemToLocalStorage(key: string, value: string) {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, value);
}
