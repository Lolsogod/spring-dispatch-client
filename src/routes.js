import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {SchedulePage} from "./pages/SchedulePage";
import {AuthPage} from "./pages/AuthPage";
import {UserViewPage} from  "./pages/UserViewPage"
import {DecanPage} from "./pages/DeacnPage";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {DecanTable} from "./components/DecanTable";

export const useRoutes = (isAuthenticated, role) => {
    if (isAuthenticated){
        if (role === "dispatcher"){
            return(
                <Routes>
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="*" element={<Navigate to="/schedule" />} />
                </Routes>
            )
        }
        if (role === "decan"){
            return(
                <Routes>
                    <Route path="teachers" element={<DecanPage />}>

                    </Route>
                    <Route path="*" element={<Navigate to="/teachers" />} />
                </Routes>
            )
        }
        return(
            <Routes>
                <Route path="schedule" element={<UserViewPage />} />
                <Route path="*" element={<Navigate to="/schedule" />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage />}>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="/" element={<Navigate to="login" />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    )
}