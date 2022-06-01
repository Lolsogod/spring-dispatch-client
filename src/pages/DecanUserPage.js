import React, {useContext, useEffect, useState}from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {Card} from "../components/Card";
import { useParams } from "react-router-dom";


export const DecanUserPage = () =>{
    let { id } = useParams();
    const auth = useContext(AuthContext)
    const [rows,setRows] = useState();
    const [misses,setMisses] = useState();
    const [error, setError] = useState("");
    useEffect(()=>{
        axios.get(`/api/t-para/${id}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setRows(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, id])
    useEffect(()=>{
        axios.get(`/api/t-para/count/${id}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setMisses(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, id])


    return(
        <div className={"userPageContainer"}>
            <nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>
            {!! rows && <div className={"flat-table"}>
                <h2>{ rows[0].teacher.name}. кол-во пропусков - {misses}</h2>
                {rows.map((para) =>{
                    return(<Card key={para.id} {...para} edit={false} flat={true} decan={true}/>)})}
            </div>}
            <h2 className="error-msg">{error}</h2>
        </div>
    )
}