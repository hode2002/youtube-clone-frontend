import HistoryList from '@/app/(user)/feed/history/HistoryList';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function HistoryPage() {
    return (
        <ScrollArea className="mx-auto h-[calc(100vh-72px)] max-w-7xl">
            <h1 className="px-4 py-8 text-2xl font-extrabold md:px-0 md:text-4xl">Nhật ký xem</h1>
            <HistoryList />
        </ScrollArea>
    );
}
