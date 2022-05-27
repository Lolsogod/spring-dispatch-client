import React, {useContext, useEffect, useState}from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {Card} from "../components/Card";


export const UserViewPage = () =>{
    const auth = useContext(AuthContext)
    const [rows,setRows] = useState();
    const [misses,setMisses] = useState();
    const [error, setError] = useState("");
    useEffect(()=>{
        axios.get(`/api/t-para/${auth.userId}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setRows(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, auth.userId])
    useEffect(()=>{
        axios.get(`/api/t-para/count/${auth.userId}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setMisses(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, auth.userId])


    return(
        <div className={"userPageContainer"}>
            <nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>
            {!! rows && <div className={"flat-table"}>
                <h2>Здравствуйте, { rows[0].teacher.name}! Ваше кол-во пропусков - {misses}</h2>
                {rows.map((para) =>{
                    return(<Card key={para.id} {...para} edit={false} flat={true}/>)})}
            </div>}
            <h2 className="error-msg">{error}</h2>
        </div>
    )
}