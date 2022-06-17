import React, {useEffect, useState, useContext} from "react";
import {EditorCard} from "./EditorCard";
import {Card} from "../Card";
import {useDate} from "../../hooks/clock.hook";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

export const RaspEditor = ({rasp, forUser = false, curUser}) => {
    const {paraTimes} = useDate()
    let daysInWeek =  ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    const auth = useContext(AuthContext)
    const [subs,setSubs] = useState([]);
    useEffect(()=>{
        axios.get(`/api/admin/subs/`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setSubs(res.data)})
            .catch(e=>console.log(e.response.data.message))},[auth.token, auth.userId]);
    return(
        <div className={"table"}>
            <div className={`row weekday`}>
                <div className={"item weekday"}></div>
                {daysInWeek.map((day,i) =>{
                    return (<div className={"item weekday"}>{day}</div>)
                })}
            </div>
            {!!rasp && rasp.map((row, i) => {
                return(
                    <div className={`row`} key={i}>
                        <div className={`item`}>
                            <div>{i+1}</div>
                            {paraTimes[i][0]}-{paraTimes[i][1]}
                        </div>
                        {daysInWeek.map((day,j) =>{
                            console.log(row)
                            let res = row.find(para => {
                                return para.day == day
                            })
                            if (forUser){
                                if (!res) return <div key={j} className={"item"}></div>
                                return (<Card key={j} {...res} edit={false} />)
                            }
                            console.log(res)
                            if (!res) return <EditorCard  num={i+1} adder={!res} day={day}
                                                         curUser={curUser} subs={subs}  />
                            else return <EditorCard  {...res} subs={subs} curUser={curUser}/>
                        })}
                    </div>
                )})}
        </div>
    )
}