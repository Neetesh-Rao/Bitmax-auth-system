 import '../styles/form.css';
import API from '../services/api';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import toast from "react-hot-toast";

export default function Login(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
        const navigate=useNavigate();

const handleLogin=async()=>{
    try{
const res=await API.post("/login",{username,password});
toast.success(res.data.message); 
localStorage.setItem("token",res.data.token);
console.log(res.data);

localStorage.setItem("user", JSON.stringify(res.data.user));
navigate("/dashboard");
    }
    catch(error){
        toast.error(error.response?.data?.message||"Login failed");
    }
}

    
    return(
        <div className='form-container'>
            <h2>Login</h2>
            <input type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}