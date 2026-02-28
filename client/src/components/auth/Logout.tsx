import { useAuthStore } from "@/stores/useAuthStore";
import {Button} from "../ui/button";
import { useNavigate } from "react-router";
const Logout = () => {
    const {logout} = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await logout();
            navigate("/");
        } catch(err){
            console.error(err)
        }
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default Logout;
