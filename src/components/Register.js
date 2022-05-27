import React, {useState} from "react";
import axios from "axios";

export const Register = () =>{
    const [form, setForm] = useState({
        email: '', password: '', name: ''
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const [error, setError] = useState("");
    const registerHandler = async () => {
        axios.post(`/register`,{
            email: form.email,
            password: form.password,
            role: "teacher",
            name: form.name
        }).then(()=>alert("Зареган."))
            .catch(e=>setError(e.response.data.message))
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
                   value={form.password}/><br/>
            <label htmlFor="name"><b>Name</b></label><br/>
            <input type="text" placeholder="Enter Name"
                   name="name" required onChange={changeHandler}
                   value={form.name}/><br/><br/>

            <button onClick={registerHandler}>Register</button>
            <div className="error-msg">{error}</div>
        </div>
    )
}