 import Logo from '../pages/logo.png';
 import '../styles/form.css';
 import toast from "react-hot-toast";

 import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup(){
    const navigate=useNavigate();
    const [identifier,setIdentifier]=useState("");

const handleSendOtp=async()=>{
    try{
    await API.post("/send-otp",{identifier});
    toast.success("OTP send successfully");
    navigate("/verify-otp",{state:{identifier}});
    }
    catch(error){
toast.error(error.response?.data?.message||"Error sending otp");
    }
};

   return(
    <div className='form-container'>
        {/* <img src={Logo} alt="Logo" style={{ width: 200 ,height:140, marginBottom: 10 }} /> */}

        <h2>Signup</h2>
        <input type="text" placeholder='Enter Email or Mobile' value={identifier} onChange={(e)=>setIdentifier(e.target.value)} />
        <button onClick={handleSendOtp}>Send OTP</button>
    </div>
   ) 
}