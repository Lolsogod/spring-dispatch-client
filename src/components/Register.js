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
        let formIsValid = true
        if(!form.password || !form.email || !form.name){
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
        console.log(form.password.length)
        if(formIsValid && form.password.length < 6){
            formIsValid = false
            setError("Минимальная длинна пароля - 6")
        }
        if(formIsValid){
            axios.post(`/register`,{
                email: form.email,
                password: form.password,
                role: "teacher",
                name: form.name
            }).then(()=>alert("Зареган."))
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