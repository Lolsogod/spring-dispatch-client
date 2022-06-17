import React, {useContext, useEffect, useState}from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {Card} from "../components/Card";
import {ExplEditor} from "../components/ExplEditor";
import {NavLink} from "react-router-dom";


export const UserViewPage = () =>{
    const auth = useContext(AuthContext)
    const [rows,setRows] = useState();
    const [misses,setMisses] = useState();
    const [error, setError] = useState("");
    const [answered, setAnswered] = useState([]);
    const [curExpl, setCurExpl] = useState(-1);

    useEffect(()=>{
        axios.get(`/api/expl/answered/${auth.userId}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setAnswered(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, auth.userId])

    const showHandler = async id => {
        setCurExpl(id);
        console.log(curExpl)
    }

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
            <div className="admin-nav">
                <NavLink to="/stats">Статистика</NavLink>
                <NavLink to="/schedule">Расписание</NavLink>
            </div>

            <div className="horizontal-container">
                {!! rows && <div className={"flat-table"}>
                    <h2>Здравствуйте, {rows[0].teacher.name}! Ваше кол-во пропусков - {misses}</h2>
                    {rows.map((para) =>{
                        return(
                            <div key={para.id} className="flat-container">
                                <Card {...para} edit={false} flat={true}/>
                                {para.state === "was-not" && (!answered.includes(para.id) ?
                                    <button onClick={() => showHandler(para.id)}>✎</button>:
                                    <button className="btn-disabled">✔</button>)}
                            </div>)})}
                </div>}
                <h2 className="error-msg">{error}</h2>
                {curExpl !== -1 && <ExplEditor paraId={curExpl}/>}
            </div>
        </div>
    )
}