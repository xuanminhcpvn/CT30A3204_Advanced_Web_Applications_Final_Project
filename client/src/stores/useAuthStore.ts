import {create} from "zustand";
import {toast} from "sonner";//optional, user can see returned event messages
import { authService } from "@/services/authServices";
import type { AuthState } from "@/types/store";
export const useAuthStore = create<AuthState>((set,get) =>({
    accessToken: null, 
    user: null,
    loading: false, //check
    
    //set everything back to initial state like above
    clearState: () => {
        set({accessToken:null, user: null, loading: false})
    },
    setAccessToken(accessToken) {
        set({accessToken})
    },
    registerFunc: async (username:string, password:string, email:string, displayName:string) => {
        try {
            set({loading: true})
            await authService.register(username,password, email, displayName)
            toast.success("Registration succeeded! Redirecting to login page");
        } catch (error) {
            if (error instanceof Error) {
                console.log(`Error when trying to register: ${error.message}`);
            }
            toast.error("Registration failed");
        } finally {
            set({loading: false})
        }
    },

    login: async (username:string, password:string) => {
        try {
            set({loading: true});
            const {accessToken} = await authService.login(username, password);
            get().setAccessToken(accessToken);
            
            await get().fetchUser();
            toast.success("Login successful")
        } catch (err) {
            console.error(err);
            toast.error("Unsuccessful login")
        } finally {
            set({loading: false})
        } 
    },

    logout: async() =>{
        try {
            get().clearState();//from authState in store.ts
            await authService.logout();
            toast.success("Logged out successfully!");
        } catch(err){
            console.error(err);
            toast.error("Logout unsuccesful!");
        }
    },
    fetchUser: async() => {
        try {
            set({loading: true});
            const user = await authService.fetchUser();
            set({user});

        } catch (err){
            console.error(err);
            toast.error("Error when fetching user's data. Please try again!")
        } finally {
            set({loading: false})
        } 
    },

    //will be used by protectedRoute when it detect that accessToken not exist
    //
    refreshAccessToken: async() => {
        try {
            set({loading: true});
            const {user, fetchUser, setAccessToken} = get();

            const accessToken = await authService.refreshAccessToken();
            setAccessToken(accessToken);
            if(!user){
                await fetchUser();
            }

        } catch (error) {
            console.error(error);
            toast.error("Login session is expired");
            get().clearState();
        } finally {
            set({loading: false});
        }
    }
}))