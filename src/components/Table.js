import React, {useEffect, useState, useContext} from "react";
import {Card} from "./Card"
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useDate} from "../hooks/clock.hook";

export const Table = () => {
    const [rows,setRows] = useState();
    const [error, setError] = useState("");
    const auth = useContext(AuthContext)

    const {paraNum, paraTimes} = useDate()

    useEffect(()=>{
        axios.get("/api/para/",
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setRows(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token])

    const isCur = i => {return i+1===paraNum}
    return (
        <div className={"table"}>
            {!!rows && rows.map((row, i) => {
                return(
                    row.length > 0 &&
                    <div className={`row`} key={i}>
                        <div className={`item${isCur(i)?" current":" not-current"}`}>
                            <div>{i+1}</div>
                            {paraTimes[i][0]}-{paraTimes[i][1]}
                        </div>
                        {row.map((para) =>{
                            return(<Card key={para.id} {...para} edit={i<paraNum} current={isCur(i)} paraTime={paraTimes[i]}/>)})}
                    </div>
                )})}
            <h2 className="error-msg">{error}</h2>
        </div>
    )
}