import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const {accessToken, user, loading, refreshAccessToken, fetchUser} = useAuthStore();
    const [starting, setStarting] = useState(true);//false only when access token is refreshed and user is fetched

    const init = async () => {
        //can happens if user reload the page
        if(!accessToken){
            await refreshAccessToken();
        }

        if(accessToken && !user){
            await fetchUser();
        }

        setStarting(false);
    }

    //Run init everytime the page reloads, 
    useEffect(() => {
        init();
    }, [])


    //must add starting state.
    //Reason: if only loading
    //when user reloads the page => state is reset => accessToken == null and loading == false
    //=> client think user is not logged in
    if(starting ||loading){
        return <div className="flex h-screen items-center justify-center">Loading the page...</div>
    }

    if (!accessToken){
        return (
            <Navigate to="/login" replace /> //Replace will set this route to root preventing going back

        )
    }

    
    // Already logged in =>  send user to the logged page () Outlet will renders child route which is our DriveHomePage /drive/home
    return (
        <Outlet/>
    )
}

export default ProtectedRoute