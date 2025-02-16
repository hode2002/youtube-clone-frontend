'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

export default function SearchInput() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const onSubmit = () => {
        if (query.trim()) return router.push('/results?search_query=' + query);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            onSubmit();
        }
    };

    return (
        <>
            <div className="relative w-full max-w-xl">
                <Input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="max-w-xl rounded-l-full border px-4 py-5 focus:mr-[1px]"
                    value={query}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div
                onClick={onSubmit}
                className="flex h-[40px] items-center justify-center rounded-r-full border bg-[#272727] px-6 py-5 transition-all hover:scale-95 hover:cursor-pointer"
            >
                <SearchIcon className="text-background dark:text-foreground" />
            </div>
        </>
    );
}
