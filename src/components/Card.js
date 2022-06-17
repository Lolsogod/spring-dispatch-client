import React,{useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useDate} from "../hooks/clock.hook";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faBan, faPersonWalking} from "@fortawesome/free-solid-svg-icons"

export const Card = ({date,audit, teacher, type, subject, state, id, checkDate, dispatcher,
                         edit=true, flat=false, decan=false, paraTime, current=false}) => {
    const auth = useContext(AuthContext)
    //smooth client/server state change
    const [clientState, setClientState] = useState(state);
    const [usrTime, setUsrTime] = useState({hour: "", minute: ""})
    const [isTimeValid, setIsTimeValid] =useState(true)
    const [showTime, setShowTime] = useState(false)
    const {isInRange, time} = useDate()
    let lastCorrectState = state;
    console.log(dispatcher)
    const changeHandler = event => {
        if(isInRange(event.target.value, paraTime)){
            console.log("hey")
            setIsTimeValid(true)
            let split = event.target.value.split(":")
            setUsrTime({hour: split[0], minute: split[1]})
        }   else setIsTimeValid(false)
    }
    console.log(!dispatcher)
    const attendanceStateHandler =  (state) => {
        let hour, minute
        if((!usrTime.hour || !usrTime.minute) && current && !showTime){
            setIsTimeValid(true)
            let split = time.split(":")
            hour = split[0]
            minute = split[1]
        }else{
            hour = usrTime.hour
            minute = usrTime.minute
        }
        setClientState(state)
        axios.put(`/api/para/${id}/state/`,
            {state, hour, minute, disId: auth.userId},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => lastCorrectState = state)
            .catch(e =>{
                if(e.response.status == 401)
                    window.location.reload()
                setIsTimeValid(false)
                setClientState(lastCorrectState)
            })
    }
    if (flat){
        let d = new Date(checkDate)
        let resd =d.getHours()+ ":" +d.getMinutes();
        return (
            <div className={`flat-item st-${clientState}`}  >
                <div className="para-date"><b>{date}</b>  {!!checkDate && "- " + resd}</div>
                <div>{audit}</div>
                <div className={"bold"}>{subject.name}</div>
                <div>({type})</div>
            </div>
        )
    }
    const editable = () =>{
        return !!edit && (!dispatcher || dispatcher.userId==auth.userId)
    }
    return (
        <div className={`item st-${clientState}`}  >
            {clientState!="pending" && dispatcher && <div className="responsible">{dispatcher.name}</div>}
            {editable() && clientState=="pending" && current &&
                <button className="reserve-btn" onClick={()=>attendanceStateHandler("reserved")}>
                    <FontAwesomeIcon icon={faPersonWalking}/>
                </button>}
            {!isTimeValid && <h5>некоректное время</h5>}
            <div>{audit}</div>
            <div className={"bold"}>{subject.name}</div>
            <div>({type})</div>
            <div>{teacher.name}</div>
            {editable() && clientState != "pending" && <div className={"controls"}>
                <button onClick={()=>attendanceStateHandler("was")}>✔</button>
                {!showTime && <button className={`show-time-btn${clientState!='pending'?" black-btn":""}`} onClick={()=>setShowTime(true)}>
                    <FontAwesomeIcon icon={faClock}/>
                </button>}
                {showTime && <div><input type="time" min={paraTime[0]} max={paraTime[1]} onChange={changeHandler}/>
                <button className={`close-time-btn${clientState!='pending'?" black-btn":""}`} onClick={()=>setShowTime(false)}>
                    <FontAwesomeIcon icon={faBan}/>
                </button></div>}
                <button onClick={()=>attendanceStateHandler("was-not")} className={"btnRed"}>✘</button>
            </div>}
        </div>
    )
}