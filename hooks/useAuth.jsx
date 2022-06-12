import {useEffect, useMemo, useState} from "react";
import { getCookie } from "cookies-next";
import getUserAuth from "services/getUserAuth";

export function useAuth(){
    const [user, setUser] = useState(null);
    useEffect( async () => {
        const token = getCookie('auth_token');
        if(token){
            const user = await getUserAuth(token);
            setUser(user);
        }
    },[])

    const loginAuth = (user) => setUser(user);

    const exitAuth = () => setUser(null); 
    
    return useMemo(() => ({user, loginAuth, exitAuth}),[user]);
}