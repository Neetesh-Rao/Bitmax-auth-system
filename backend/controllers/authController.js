import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {sendEmailOtp,sendMobileOtp} from '../utils/sendOtp.js';


export const sendOtp=async(req,res)=>{
    const {identifier}=req.body;
   const otp=Math.floor(100000+Math.random()*900000).toString();

   let user = await User.findOne({
    $or:[
        {email:identifier},
        {mobile:identifier}
    ]
   });

if (!user) {
  if (identifier.includes("@")) {
    user = new User({ email: identifier });
  } else if (/^\d{10,15}$/.test(identifier)) {
    user = new User({ mobile: identifier });
  } else {
    return res.status(400).json({ message: "Invalid email or mobile" });
  }
}

    user.otp=otp;
    user.otpExpires=Date.now()+10*60*1000; 
    if (!user.email && !user.mobile) {
  return res.status(400).json({ message: "Cannot create user without email or mobile" });
}

    await user.save();

     if (user.email) {
      await sendEmailOtp(user.email,otp); 
    } else if (user.mobile) {
      await sendMobileOtp(user.mobile,otp); 
    }

    return res.status(200).json({
        success:true,
        message:"OTP sent successfully"
    });

}


export const verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({
        success: false,
        message: "Identifier and OTP are required"
      });
    }

    // Find the user by email or mobile
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { mobile: identifier }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check OTP and expiry
    if (user.otp !== otp || !user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or OTP expired"
      });
    }

    // OTP is valid → verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



export const login=async(req,res)=>{
    const {username,password}=req.body;
    console.log("Login request:", req.body);

      const user = await User.findOne({ username });

       if (!user) return res.status(404).json({ message: "User not found" });
       console.log("Found user:", user);
if(!user.isVerified){
    return res.status(400).json({message:"User not Verified"});
}

const match=await bcrypt.compare(password,user.password);
if(!match){
    return res.status(400).json({message:"wrong password"});
}
console.log("Password match:", match);

const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

res.status(200).json({
  message: "Login successful",
  token: token,
   user: {
      username: user.username,
     email: user.email || null,
      mobile: user.mobile || null
    }
});

}

export const setCredentials = async (req, res) => {
  try {
    const { identifier, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set credentials
    user.username = username;
    user.password = hashedPassword;

    // Make sure email/mobile are saved if missing
    user.email = user.email || (identifier.includes("@") ? identifier : undefined);
    user.mobile = user.mobile || (!identifier.includes("@") ? identifier : undefined);

    // Save to DB
    await user.save();

    // Respond success (use JSON if frontend fetch expects it)
    res.status(200).json({ success: true, message: "Credentials set successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


