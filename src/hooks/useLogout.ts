import { logout } from '@/apiRequests';
import { useAuthStore, useChannelStore, useSubscriptionStore, useUserStore } from '@/stores';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const userLogout = async () => {
        const { clearAuth } = useAuthStore.getState();
        const { removeProfile } = useUserStore.getState();
        const { clearChannel } = useChannelStore.getState();
        const { clearSubscription } = useSubscriptionStore.getState();

        await logout();

        clearAuth();
        removeProfile();
        clearChannel();
        clearSubscription();

        queryClient.clear();
    };

    return userLogout;
};
