'use client';

import { ModeToggle } from './ModeToggle';
import AddVideo from '@/components/AddVideo';
import GoogleAuth from '@/components/GoogleAuth';
import { useUserStore } from '@/stores';

const StudioAccount = () => {
    const { profile } = useUserStore((state) => state);
    return (
        <div className="flex items-center gap-2 md:gap-5">
            {profile && <AddVideo />}

            <ModeToggle />

            <GoogleAuth />
        </div>
    );
};

export default StudioAccount;
