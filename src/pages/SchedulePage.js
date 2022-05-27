import React, {useContext} from "react";
import {useDate} from "../hooks/clock.hook";
import {Table} from "../components/Table"
import {AuthContext} from "../context/AuthContext";

export const SchedulePage = () =>{
    const {date, time} = useDate()
    const auth = useContext(AuthContext)


    return(
        <div className={"schedulePageContainer"}>
            <nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>
            <div className={"clock"}>
                <div>{date}</div>
                <div>{time}</div>
            </div>
            <Table/>
        </div>
    )
}