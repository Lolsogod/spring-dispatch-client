import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

export const ExlpViewer = paraId =>{
    const auth = useContext(AuthContext)
    const [expl,setExpl] = useState();

    useEffect(()=>{
        axios.get(`/api/expl/${paraId.paraId}`,//почему?
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setExpl(res.data)})
            .catch(e=>console.log(e.response.data.message))},[auth.token, paraId.paraId]);

    return(
        <>{!!expl && <div className="expl">
            <div className="text-right">
                Директору сгту
                <br/>комуто
                <br/>от преподавателя
                <br/>{expl.para.teacher.name}
            </div>
            <h2 style={{"textAlign": "center"}}>ОБЪЯСНИТЕЛЬНАЯ ЗАПИСКА</h2>
            Я, {expl.para.teacher.name}, {expl.para.date} не присутствовал на работе поскольку {expl.reason}
            <br/>
            <br/>{expl.writingDate}  <span style={{"float" : "right"}}>{expl.para.teacher.name}</span>
        </div>}
        </>
    )
}