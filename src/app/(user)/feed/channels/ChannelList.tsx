'use client';

import React from 'react';
import ChannelCard from '@/components/ChannelCard';
import { useSubscriptionStore } from '@/stores';

const ChannelList = () => {
    const { subscriptions } = useSubscriptionStore();

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-extrabold text-foreground">Tất cả kênh đã đăng ký</h1>
            <div className="mx-auto mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
                {subscriptions.map((sub, index) => (
                    <ChannelCard
                        className="max-w-sm border bg-[#272727] px-2"
                        key={index}
                        channel={sub.channel}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChannelList;
