import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {RoleEditor} from "./RoleEditor";
import {RaspEditor} from "./RaspEditor";

export const ScheduleEditPage = () =>{
    const auth = useContext(AuthContext)
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axios.get(`/api/admin/`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setUsers(res.data)})
            .catch(e=>console.log(e.response.data.message))},[auth.token, auth.userId]);
    const [curUser, setCurUser] = useState("")

    const [rasp, setRasp] = useState([]);

    const getRasp = ()=>{axios.get(`/api/admin/${curUser}/rasp/`,
        {headers: {Authorization: `Bearer ${auth.token}`}})
        .then(res=>{setRasp(res.data)})
        .catch(e=>console.log(e.response.data.message))}

    const changeHandler = event => {
        setCurUser(event.target.value)
    }
    useEffect(() => {
        if(curUser) getRasp()
    }, [curUser]);
    return(
        <div>
            {!!users && <select value={curUser} onChange={changeHandler} id="user" name="users">
                <option value="">-----------</option>
                {users.map((user, index) =>{
                    return(<option key={index} value={user.userId}>{user.name}</option>)})}
            </select>}
            {!!rasp && !!curUser &&
                <RaspEditor rasp={rasp} curUser={curUser} />
            }
        </div>
    )
}