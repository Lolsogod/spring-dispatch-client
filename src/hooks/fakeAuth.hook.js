import {useState, useCallback, useEffect} from 'react';

const storageName = "userData"
export const useAuth = () =>{
    const [token, setToken] = useState(false);

    const login = useCallback(() => {
        setToken(true);

        localStorage.setItem(storageName, JSON.stringify({
             token: true
        }));
    }, [])

    const logout = useCallback(() => {
        setToken(false);
        localStorage.removeItem(storageName);
    }, [])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName));
        if(data && data.token){
            login()
        }
    }, [login])

    return {login, logout, token}
}