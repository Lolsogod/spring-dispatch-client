import React, {useEffect, useState, useContext} from "react";
import {Card} from "./Card"
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

export const Table = () => {
    const [rows,setRows] = useState();
    const [error, setError] = useState("");
    const auth = useContext(AuthContext)
    const times = ["8.00-9.30", "9.45-11.15", "11.30-13.00","13.40-15.10","15.20-16.50"]
    useEffect(()=>{
        axios.get("/api/para/",
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setRows(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token])
    return (
        <div className={"table"}>
            {!!rows && rows.map((row, i) => {
                return(
                    row.length > 0 &&
                    <div className={`row`} key={i}>
                        <div className={"item"}>
                            <div>{i+1}</div>
                            {times[i]}
                        </div>
                        {row.map((para) =>{
                            return(<Card key={para.id} {...para} />)})}
                    </div>
                )})}
            <h2 className="error-msg">{error}</h2>
        </div>
    )
}