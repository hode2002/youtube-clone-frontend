export type UserRole = 'USER' | 'CHANNEL' | 'ADMIN';

export type User = {
    _id: string;
    email: string;
    username: string;
    fullName?: string | '';
    avatarUrl: string;
    role: UserRole;
    hasChannel: boolean;
};

export type UserStore = {
    profile: User | null;
    removeProfile: () => void;
    setProfile: (profile: User) => void;
    updateAvatar: (avatar: string) => void;
};
