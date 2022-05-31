import React, {useContext, useEffect,useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {Outlet} from  "react-router-dom"



export const DecanPage = () =>{
    const auth = useContext(AuthContext)
    const [teachers,setTeachers] = useState([]);
    useEffect(()=>{
        axios.get(`/api/decan/`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setTeachers(res.data)})
            .catch(e=>console.log(e.response.data.message))},[auth.token, auth.userId]);
    return (
        <div>
            {!!teachers && <div className="teachers-list">
                {teachers.map((teacher, index) =>{
                    console.log(teacher)
                    return(<div id={index}>
                        {index+1}. {teacher.name}</div>)})}
            </div>}
            <Outlet/>
        </div>
    )
}