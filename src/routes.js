import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {SchedulePage} from "./pages/SchedulePage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Routes>
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="*" element={<Navigate to="/schedule" />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage />}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}