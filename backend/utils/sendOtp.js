import nodemailer from 'nodemailer';
import client from '../config/twilio.js';


export const sendEmailOtp=async(email,otp)=>{
    const transpoter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
    });
await transpoter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:"OTP Verification",
        text:`Your OTP is ${otp}`
    });
};

export const sendMobileOtp=async(mobile, otp)=>{
    if (!mobile.startsWith("+")) {
    mobile = "+91" + mobile; // adjust country code
  }

 return await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: mobile
});
};