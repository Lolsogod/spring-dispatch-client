import React from "react";
import {NavLink, Outlet} from "react-router-dom";

export const AuthPage = () =>{

    return(
        <div className="container">
            <h1>DiSP</h1>
            <div className="switch">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </div>
            <Outlet/>
        </div>
    )
}