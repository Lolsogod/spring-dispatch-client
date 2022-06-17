import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {SchedulePage} from "./pages/SchedulePage";
import {AuthPage} from "./pages/AuthPage";
import {UserViewPage} from  "./pages/UserViewPage"
import {DecanPage} from "./pages/DeacnPage";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {DecanUserPage} from "./pages/DecanUserPage";
import {AdminPage} from "./pages/AdminPage";
import {UserEditPage} from "./components/admin/UserEditPage";
import {ScheduleEditPage} from "./components/admin/ScheduleEditPage";
import {RaspEditor} from "./components/admin/RaspEditor";
import {UserSchedulePage} from "./pages/UserSchedulePage";

export const useRoutes = (isAuthenticated, role) => {
    if (role === "admin"){
        return(
            <Routes>
                <Route path="/" element={<AdminPage />}>
                    <Route path="users" element={<UserEditPage/>}/>
                    <Route path="schedule" element={<ScheduleEditPage/>}/>
                    <Route path="/" element={<Navigate to="users" />} />
                </Route>
                <Route path="*" element={<Navigate to="/users" />} />
            </Routes>
        )
    }
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

                    <Route path="/" element={<DecanPage />}>
                        <Route path=":id" element={<DecanUserPage/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/"/>}/>
                    <Route path="/login" element={<Navigate to="/"/>}/>
                    {/* <Route path="*" element={<Navigate to="/teachers" />} />
                    <Route path="teachers" element={<DecanPage />}/>
                    <Route path="teachers/:id" element={<DecanUserPage />}/>
                    <Route path="*" element={<Navigate to="/teachers" />} />*/}
                </Routes>
            )
        }
        return(
            <Routes>
                <Route path="stats" element={<UserViewPage />} />
                <Route path="schedule" element={<UserSchedulePage/>} />
                <Route path="*" element={<Navigate to="/stats" />} />
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