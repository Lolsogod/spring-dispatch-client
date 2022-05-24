import React, {useState, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

export const AuthPage = () =>{
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        axios.post("/authenticate",{
            username: form.email,
            password: form.password
        },).then(res => auth.login(res.data.token, 1))
            .catch(e=>console.log(e))
    }


    const registerHandler = async () => {
        alert("потом сделаю")
    }

    return(
        <div className="container">
            <h1>DiSP</h1>
            <label htmlFor="email"><b>Email</b></label><br/>
            <input type="email" placeholder="Enter email"
                   name="email" required onChange={changeHandler}
                   value={form.email}/><br/>
            <label htmlFor="password"><b>Password</b></label><br/>
            <input type="password" placeholder="Enter Password"
                   name="password" required onChange={changeHandler}
                   value={form.password}/><br/><br/>
            <button onClick={loginHandler} style={{marginRight: "1rem"}}>Login</button>
            <button onClick={registerHandler}>Register</button>
        </div>
    )
}