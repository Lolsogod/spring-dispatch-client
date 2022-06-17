import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {RaspEditor} from "../components/admin/RaspEditor";
import {NavLink} from "react-router-dom";

export const UserSchedulePage = () =>{
    const auth = useContext(AuthContext)

    const [rasp, setRasp] = useState([]);

    const getRasp = ()=>{axios.get(`/api/admin/${auth.userId}/rasp/`,
        {headers: {Authorization: `Bearer ${auth.token}`}})
        .then(res=>{setRasp(res.data)})
        .catch(e=>console.log(e.response.data.message))}


    useEffect(() => {
         getRasp()
    }, [auth.userId]);
    return(
        <div className={"userPageContainer"}>
            <nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>
            <div className="admin-nav">
                <NavLink to="/stats">Статистика</NavLink>
                <NavLink to="/schedule">Расписание</NavLink>
            </div>
            {!!rasp &&
                <RaspEditor rasp={rasp} forUser={true}/>
            }
        </div>
    )
}