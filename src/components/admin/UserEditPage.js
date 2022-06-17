import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {RoleEditor} from "./RoleEditor";

export const UserEditPage = () =>{
    const auth = useContext(AuthContext)
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        axios.get(`/api/admin/`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setUsers(res.data)})
            .catch(e=>console.log(e.response.data.message))},[auth.token, auth.userId]);
    return(
        <div>
            <div className="horizontal-container-2">
                {!!users && <div className="teachers-list">
                    {users.map((user, index) =>{
                        return(
                            <RoleEditor key={index} {...user}/>)})}
                </div>}
            </div>
        </div>
    )
}