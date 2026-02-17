import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, sparse: true },
  password: { type: String },
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);
