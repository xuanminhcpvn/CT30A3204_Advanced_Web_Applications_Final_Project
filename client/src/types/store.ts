import type { IUser } from "./user";

export interface AuthState {
    accessToken: string | null,
    user: IUser | null;
    loading: boolean;

    clearState: () => void;
    setAccessToken: (accessToken:string) => void;
    registerFunc: (username: string, password: string, email:string, displayName: string) => Promise<void>
    login: (username:string, password:string) => Promise<void>
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    refreshAccessToken: () => Promise<void>
}