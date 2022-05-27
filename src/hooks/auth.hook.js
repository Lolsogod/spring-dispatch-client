import {useState, useCallback, useEffect} from 'react';

const storageName = "userData"
export const useAuth = () =>{
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false)
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(false)
    const [email, setEmail] = useState(null);

    const parseJwt = (token) => {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const login = useCallback((jwtToken) => {
        setToken(jwtToken);
        const parsed = parseJwt(jwtToken);
        setRole(parsed.role);
        setUserId(parsed.jti);
        setEmail(parsed.sub);

        localStorage.setItem(storageName, JSON.stringify({
             token: jwtToken
        }));
    }, [])

    const logout = useCallback(() => {
        setToken(null);
        setRole(null);
        setUserId(null);
        setEmail(null);

        localStorage.removeItem(storageName);
    }, [])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName));
        if(data && data.token){
            login(data.token)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, role, userId,email, ready}
}