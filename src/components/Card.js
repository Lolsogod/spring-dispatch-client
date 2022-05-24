import React,{useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

export const Card = ({audit, teacher, type, subject, state, id}) => {
    const auth = useContext(AuthContext)
    //fast and stable client/server state change
    const [clientState, setClientState] = useState(state);
    let lastCorrectState = state;
    const attendanceStateHandler = (state) => {
        setClientState(state)
        axios.put(`/api/para/${id}/state/${state}`,{},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => lastCorrectState = state)
            .catch(() =>setClientState(lastCorrectState))
    }

    return (
        <div className={`item st-${clientState}`}  >
            <div>{audit}</div>
            <div className={"bold"}>{subject.name}</div>
                <div>({type})</div>
                <div>{teacher.name}</div>
            <div className={"controls"}>
                <button onClick={()=>attendanceStateHandler("was")}>✔</button>
                <button onClick={()=>attendanceStateHandler("was-not")} className={"btnRed"}>✘</button>
            </div>
        </div>
    )
}