import express from 'express';
const router = express.Router();
import {sendOtp,verifyOtp,login,setCredentials} from '../controllers/authController.js';



router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/login",login);
router.post("/set-credentials",setCredentials)









export default router;
