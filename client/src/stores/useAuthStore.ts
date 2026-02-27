import {create} from "zustand";
import {toast} from "sonner";//optional, user can see returned event messages
import { authService } from "@/services/authServices";
import type { AuthState } from "@/types/store";
export const useAuthStore = create<AuthState>((set) =>({
    accessToken: null, 
    user: null,
    loading: false, //check
    registerFunc: async (username:string, password:string, email:string, displayName:string) => {
        try {
            set({loading: true})
            await authService.register(username,password, email, displayName)
            toast.success("Registration succeeded! Redirecting to login page");
            return true;
        } catch (error) {
            if (error instanceof Error) {
                console.log(`Error when trying to register: ${error.message}`);
            }
            toast.error("Registration failed");
            return false;
        } finally {
            set({loading: false})
        }
    }
}))