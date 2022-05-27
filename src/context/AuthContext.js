import {createContext} from 'react';

const noop = () => {}
export const AuthContext = createContext({
    token: null,
    role: null,
    userId: null,
    emai: null,
    login: noop,
    logout: noop,
    isAuthenticated: false

})