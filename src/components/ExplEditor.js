import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useDate} from "../hooks/clock.hook";

export const ExplEditor = paraId =>{
    const auth = useContext(AuthContext)
    const [curPara,setCurPara] = useState();
    const {date} = useDate()
    const [form, setForm] = useState({reason: ''})
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    useEffect(()=>{
        axios.get(`/api/para/${paraId.paraId}`,//почему?
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>{setCurPara(res.data)})
            .catch(e=>console.log(e.response.data.message))},[auth.token, paraId.paraId]);

    const addingHandler = async () => {
        axios.post(`/api/expl/${paraId.paraId}/new`,
            {/*maybe remove?*/reason: form.reason},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            //костылина...
            // eslint-disable-next-line no-restricted-globals
            .then(() => location.reload())
            .catch(e => console.log(e));
    }

    return(
        <>{!!curPara && <div className="expl">
            <div className="text-right">
                Директору сгту
                <br/>Яковлеву Сергею Максимовичу
                <br/>от преподавателя
                <br/>{curPara.teacher.name}
            </div>
            <h2 style={{"textAlign": "center"}}>ОБЪЯСНИТЕЛЬНАЯ ЗАПИСКА</h2>
            Я, {curPara.teacher.name}, {curPara.date} не присутствовал на работе поскольку
            <br/><textarea placeholder="Введте причину отсутсвия"
                        name="reason" required onChange={changeHandler}
                        value={form.reason}/><br/>
            <br/> {date} <span style={{"float" : "right"}}>{curPara.teacher.name}</span>
            <br/><br/><button onClick={addingHandler}>Отправить</button>
        </div>}
        </>
    )
}