import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber({
    number = 0,
    notation = 'compact',
    compactDisplay = 'short',
    suffix = '',
}: {
    number?: number;
    notation?: 'standard' | 'compact';
    compactDisplay?: 'short' | 'long';
    suffix?: string;
}) {
    return (
        new Intl.NumberFormat('vi-VN', {
            notation,
            compactDisplay,
        }).format(number) +
        ' ' +
        suffix
    );
}

export function formatUploadTime(date: string, type: 'fromNow' | 'detail' = 'fromNow') {
    if (type === 'fromNow') return moment(date).fromNow().replace('một', '1');
    return moment(date).format('D [thg] M, YYYY');
}

export function getItemFromLocalStorage(key: string) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
}

export function setItemToLocalStorage(key: string, value: string) {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, value);
}

export function removeItemFromLocalStorage(key: string) {
    if (typeof window !== 'undefined') window.localStorage.removeItem(key);
}
