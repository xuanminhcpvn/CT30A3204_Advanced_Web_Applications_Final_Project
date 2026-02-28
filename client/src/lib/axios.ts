import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
const axiosAPI = axios.create({
    baseURL:"/api", withCredentials: true
})

// Paste access token to every req.header sent using interceptor
axiosAPI.interceptors.request.use((config) => {
    const {accessToken} = useAuthStore.getState(); //Should not useState() that automatically update state, getState() make sure that the function is called once

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
})

// Automatically call refresh access token API whenever access token is expired

axiosAPI.interceptors.response.use((res) =>  res /*return response if successful*/, async (error) => {//else return error
    const originalRequest = error.config;//



    //APIs that do not need to check refresh token, just return error 
    if (originalRequest.url.includes("/auth/register") || originalRequest.url.includes("/auth/login") || originalRequest.url.includes("/auth/refresh")) {
        return Promise.reject(error);
    } 

    originalRequest._retryCount = originalRequest._retryCount || 0;

    //to prevent constant refresh, restrict retry attempt
    if (error.response?.status === 403  && originalRequest._retryCount < 3){//res.status(403) occurs when access token is expired
        originalRequest._retryCount+=1;
        try {
            const res = await axiosAPI.post("auth/refresh", {withCredentials:true});
            const newAccessToken = res.data.accessToken;
            useAuthStore.getState().setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; //paste new access token to the initial/original request
        } catch (refreshError) {
            useAuthStore.getState().clearState();
            return Promise.reject(refreshError);
        }
    } 

    return Promise.reject(error);
})
export default axiosAPI;