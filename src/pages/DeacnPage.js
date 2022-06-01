import React, {useContext, useEffect,useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {Outlet} from  "react-router-dom"
import { NavLink } from "react-router-dom";



export const DecanPage = () =>{
    const auth = useContext(AuthContext)
    const [teachers,setTeachers] = useState([]);
    useEffect(()=>{
        axios.get(`/api/decan/`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setTeachers(res.data)})
            .catch(e=>console.log(e.response.data.message))},[auth.token, auth.userId]);
    return (
        <div className="decan-container">
            <nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>
            {!!teachers && <div className="teachers-list">
                {teachers.map((teacher, index) =>{
                    return(
                        <NavLink className="teacher-link" id={index} to={`/teacher/${teacher.userId}`}>
                        {index+1}. {teacher.name}
                        </NavLink>)})}
            </div>}
            <Outlet/>
        </div>
    )
}