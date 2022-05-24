import React, {useEffect, useState, useContext} from "react";
import {Card} from "./Card"
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

export const Table = () => {
    const [attendances,setAttendances] = useState();
    const auth = useContext(AuthContext)

    useEffect(()=>{
        axios.get("/api/para/",
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setAttendances(res.data)})},[auth.token])
    return (
        <div className={"table"}>
            {!!attendances && Array(1).fill(0).map((_, i) => {
                return(
                    <div className={`row`} key={i}>
                        <div className={"item"}>
                            <div>{i+1}</div>
                            8.00-9.30
                        </div>
                        {attendances.map((para) =>{
                            return(<Card key={para.id} {...para} />)})}
                    </div>
                )})}
        </div>
    )
}