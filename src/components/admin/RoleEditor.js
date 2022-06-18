import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";

export const RoleEditor = ({userId, name, role}) =>{
    const auth = useContext(AuthContext)
    const [curRole, setCurRole] = useState(role)
    const changeHandler = event => {
        setCurRole(event.target.value)
    }
    const roleHandler = () => {
        axios.put(`/api/admin/${userId}/role`,{curRole},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => alert("changed!"))
            .catch(e=>alert(e.response.data.message))
    }
    return(
        <div className="role-editor">
            <span className="role-ed-name">{name} ({userId})</span>
            <select value={curRole} onChange={changeHandler} id="roles" name="roles">
                <option value="teacher">teacher</option>
                <option value="dispatcher">dispatcher</option>
                <option value="decan">decan</option>
                <option value="admin">admin</option>
            </select>
            <button onClick={roleHandler}> изменить</button>
        </div>
    )
}