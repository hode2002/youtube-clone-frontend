export type AuthStore = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    clearAuth: () => void;
};
