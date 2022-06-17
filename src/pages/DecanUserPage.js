import React, {useContext, useEffect, useState}from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {Card} from "../components/Card";
import { useParams } from "react-router-dom";
import {ExlpViewer} from "../components/exlpViewer";


export const DecanUserPage = () =>{
    let { id } = useParams();
    const auth = useContext(AuthContext)
    const [rows,setRows] = useState();
    const [misses,setMisses] = useState();
    const [error, setError] = useState("");
    const [curExpl, setCurExpl] = useState(-1);
    const [answered, setAnswered] = useState([]);

    const showHandler = async id => {
        setCurExpl(id);
        console.log(curExpl)
    }
    useEffect(()=>{
        showHandler(-1)
    },[id])
    useEffect(()=>{
        axios.get(`/api/expl/answered/${id}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setAnswered(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, id])

    useEffect(()=>{
        axios.get(`/api/t-para/${id}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setError("")
                setRows(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, id])

    useEffect(()=>{
        axios.get(`/api/t-para/count/${id}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setMisses(res.data)})
            .catch(e=>setError(e.response.data.message))},[auth.token, id])
    //wtf is this
    const checker = (paraId, paraState) =>{
        if(paraState === "was-not" && answered.includes(paraState))
            return true
        return false
    }
    return(
        <>
            {/*<nav>
                <h1 className={"logo"}>DiSP</h1>
                <div className={"logout"} onClick={auth.logout}>x</div>
            </nav>*/}
            {!error && <div className="horizontal-container">
                {!! rows && <div className={"flat-table"}>
                    <h2 style={{"marginTop": "0"}}>{ rows[0].teacher.name}. кол-во пропусков - {misses}</h2>
                    {rows.map((para) =>{
                        return(<div key={para.id} className="flat-container">
                            <Card  {...para} edit={false} flat={true} decan={true}/>
                            {para.state === "was-not" && answered.includes(para.id) &&
                                <button onClick={() => showHandler(para.id)}>🗎</button>}
                        </div>)})}
                </div>}
                {curExpl !== -1 &&<div className="exl-cont"><ExlpViewer paraId={curExpl}/>
                    <button className="close-expl btnRed" onClick={()=>showHandler(-1)}>x</button></div>}
            </div>}
            <h2 className="error-msg">{error}</h2>
        </>
    )
}