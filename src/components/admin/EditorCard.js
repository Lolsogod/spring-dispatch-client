import React, {useState, useContext, useEffect}  from "react"
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

export const EditorCard = ({num, active, audit, type="лекц", id, adder=false,
                               curUser, subs, day, subject}) =>{
    const auth = useContext(AuthContext)
    const [curId, setCurId] = useState(id)
    //get subjects
    const [isAdder, setIsAdder] = useState(adder)
    const [form, setForm] = useState({
        type: type, audit: audit, subjectId: !!subject?subject.subjectId:"",
        num: num, userId: curUser, day: day
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const changePrototype = () =>{
        axios.put(`/api/admin/${curId}/prototype/`,{...form},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => alert("changed!"))
            .catch(e=>alert(e.response.data.message))
    }
    const disablePrototype = () =>{
        axios.put(`/api/admin/${curId}/disable/`,{},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => {
                console.log(curUser)
                alert("disabled!")
                setIsAdder(true)
            })
            .catch(e=>alert(e.response.data.message))
    }



    //adder states and stuff
    const addPrototype = () =>{
        console.log(form)
        axios.put(`/api/admin/new-prototype/`,{...form},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => {
                alert("added!")
                console.log(`DDDDDDDDDDDDDDDDD`)
                setCurId(res.data)
                console.log(res.data)
                setIsAdder(false)
                setShowAdd(false)
            })
            .catch(e=>console.log(e))
    }

    const [showAdd, setShowAdd] = useState(false)
    if(isAdder){
        return(<div className={"item"}>
            {!showAdd && <button onClick={()=>setShowAdd(true)}>+</button>}
            {showAdd &&
                <>
                    {<select value={form.subjectId} onChange={changeHandler} id="subjectId" name="subjectId">
                        <option value="">-----------</option>
                        {subs.map((sub, index) =>{
                            return(<option key={index} value={sub.subjectId}>{sub.name}</option>)})}
                    </select>}
                    <select value={form.type} onChange={changeHandler}
                            id="type" name="type">
                        <option value="лекц">лекц</option>
                        <option value="прак">прак</option>
                    </select>
                    <input type="text" name="audit"
                           required onChange={changeHandler}
                           value={form.audit}/><br/>
                    <button onClick={addPrototype}>Добавить</button>
                </>
            }
        </div>)
    }


    return(
        <div className="item">
            <select value={form.subjectId} onChange={changeHandler} id="subjectId" name="subjectId">
                <option value="">-----------</option>
                {subs.map((sub, index) =>{
                    return(<option key={index} value={sub.subjectId}>{sub.name}</option>)})}
            </select>
            <select value={form.type} onChange={changeHandler}
                    id="type" name="type">
                <option value="лекц">лекц</option>
                <option value="прак">прак</option>
            </select>
            <input type="text" name="audit"
                   required onChange={changeHandler}
                   value={form.audit}/><br/>
            <button onClick={changePrototype}>Изменить</button>
            <button className="reserve-btn btnRed" onClick={disablePrototype}>X</button>
        </div>
    )
}