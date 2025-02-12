'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default () => {
    const router = useRouter();
    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', '?'));
        const token = params.get('token');

        if (token) {
            localStorage.setItem('access_token', token);
            window.history.replaceState(null, '', '/');
            router.push('/');
        }
    }, []);
};
