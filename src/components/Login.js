import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

export const Login = () =>{
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const [error, setError] = useState("");
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        let formIsValid = true
        if(!form.password || !form.email){
            formIsValid = false
            setError("Поля не могут быть пустыми")
        }
        else if (typeof form.email !== "undefined") {
            let lastAtPos = form.email.lastIndexOf("@");
            let lastDotPos = form.email.lastIndexOf(".");
            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    form.email.indexOf("@@") === -1 &&
                    lastDotPos > 2 &&
                    form.email.length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                setError("Некоректный email.");
            }
        }

        if(formIsValid){
            axios.post("/authenticate",{
                username: form.email,
                password: form.password
            },).then(res => auth.login(res.data.token))
                .catch(e=>setError(e.response.data.message))
        }
    }
    return(
        <div>
            <label htmlFor="email"><b>Email</b></label><br/>
            <input type="email" placeholder="Enter email"
                   name="email" required onChange={changeHandler}
                   value={form.email}/><br/>
            <label htmlFor="password"><b>Password</b></label><br/>
            <input type="password" placeholder="Enter Password"
                   name="password" required onChange={changeHandler}
                   value={form.password}/><br/><br/>
            <button onClick={loginHandler}>Login</button>
            <div className="error-msg">{error}</div>
        </div>
    )
}