import type { IUser } from "./user";

export interface AuthState {
    accessToken: string | null,
    user: IUser | null;
    loading: boolean;

    registerFunc: (username: string, password: string, email:string, displayName: string) => Promise<Boolean>
}