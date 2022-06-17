import React, {useContext} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const AdminPage = () =>{
    const auth = useContext(AuthContext)
    return(
        <div className={"admin-container"}>
            <nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>
            <div className={"admin-nav"}>
                <NavLink to="/users">Пользователи</NavLink>
                <NavLink to="/schedule">Расписание</NavLink>
            </div>
            <Outlet/>
        </div>
    )
}