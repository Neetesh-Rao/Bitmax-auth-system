import '../styles/form.css'
import API from '../services/api';
import toast from "react-hot-toast";

import {useLocation,useNavigate} from "react-router-dom";
import { useState } from 'react';

export default function SetCredentials(){
    const location=useLocation();
    const navigate=useNavigate();

    const identifier=location.state?.identifier;

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const handleSubmit=async()=>{
  try{
     await API.post("/set-credentials",{
    identifier,
    username,
    password,
    confirmPassword
   });
   toast.success("Registration Successful");
   navigate("/login");
  }
  catch(error){
    toast.success(error.response?.data?.message||"Error");
  }
}


    return(
        <div className='form-container'>
            <h2>
                Set Username & Password
            </h2>
            <input placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            <input type="password" placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>

        </div>
    )
}