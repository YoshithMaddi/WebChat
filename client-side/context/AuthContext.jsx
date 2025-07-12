import {createContext } from "react";
import axios from 'axios'


const backendUrl =import.meta.end.VITE_BACKEND_URL;
axios.defaults.baseURL=backendUrl;


export const AuthContext = createContext();


export const AuthProvider=({children})=>{
    const value={
        axios
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}