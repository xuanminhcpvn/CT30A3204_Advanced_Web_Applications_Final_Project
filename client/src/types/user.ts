export interface IUser {
    _id: string;
    username: string;
    email: string;
    displayName: string;
    profilePicture?: string;
    createdAt?:string;
    updatedAt?:string;
    settings?: {
        theme: "light" | "dark",
        language: "en" | "fi"
    }
}