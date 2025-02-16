export type User = {
    email: string;
    uniqueName?: string;
    name?: string | '';
    avatar: string;
    role?: 'ADMIN' | 'USER';
    hasChannel?: boolean;
};

export type UserStore = {
    profile: User | null;
    removeProfile: () => void;
    setProfile: (profile: User) => void;
    updateAvatar: (avatar: string) => void;
};
