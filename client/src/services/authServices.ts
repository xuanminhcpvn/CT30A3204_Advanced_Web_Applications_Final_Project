import axiosAPI from "@/lib/axios";


export const authService = {
    register: async (username: string, password: string, email: string, displayName: string) => {
        const res = await axiosAPI.post("/auth/register",  {username, password, email, displayName}, {withCredentials: true});
        return res.data;

    },
    login: async (username: string, password:string) => {
        const res = await axiosAPI.post("/auth/login", {username, password}, {withCredentials:true});
        return res.data;
    },
    logout: async () => {
        return axiosAPI.post("/auth/logout",  {}, {withCredentials:true});
    },
    fetchUser: async () => {
        const res = await axiosAPI.get("/users/me", {withCredentials:true});
        return res.data.user;
    },
    
    refreshAccessToken: async () => {
        const res = await axiosAPI.post("/auth/refresh", {withCredentials:true})
        return res.data.accessToken;
    }
}