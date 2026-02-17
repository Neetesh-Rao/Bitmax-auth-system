import '../styles/form.css'
import API from '../services/api'
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function VerifyOtp(){
    const [otp,setOtp]=useState("");
    const navigate = useNavigate();
    const location =useLocation();

    const identifier=location.state?.identifier;

    const handleVerify=async()=>{
        try{
await API.post("verify-otp",{identifier,otp});
toast.success("OTP Verified");
navigate("/set-credentials",{state:{identifier}});
        }
        catch(error){
toast.error(error.response?.data?.message||"Invalid OTP");
        }
    }
    
    return(
<div className='form-container'>
    <h2>Verify OTP</h2>
    <input type='text' placeholder='Enter OTP' value={otp} onChange={(e)=>setOtp(e.target.value)}/>
    <button onClick={handleVerify}>Verify OTP</button>
</div>
    )
}