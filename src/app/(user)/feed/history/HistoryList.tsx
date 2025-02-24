'use client';

import { getWatchHistory } from '@/apiRequests';
import HistoryBlock from '@/app/(user)/feed/history/HistoryBlock';
import { formatUploadTime } from '@/lib/utils';
import { WatchHistory } from '@/types/watch-history';
import { useEffect, useState } from 'react';

export default function HistoryList() {
    const [watchHistories, setWatchHistories] = useState<WatchHistory[]>([]);

    useEffect(() => {
        (async () => {
            const list = await getWatchHistory();
            setWatchHistories(list);
        })();
    }, []);

    return (
        <div className="mx-auto px-4">
            {watchHistories &&
                watchHistories.length > 0 &&
                watchHistories.map((watchHistory) => (
                    <HistoryBlock
                        key={watchHistory._id}
                        videos={[watchHistory.video]}
                        title={formatUploadTime(watchHistory.watchedAt)}
                    />
                ))}
        </div>
    );
}
