import axiosAPI from "@/lib/axios";


export const authService = {
    register: async (username: string, password: string, email: string, displayName: string) => {
        const res = await axiosAPI.post("/auth/register",  {username, password, email, displayName}, {withCredentials: true});
        return res.data;

    },
}