import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  sendOTPForLogin,
  sendOTPForRegister,
  verifyOTPAndLogin,
  verifyOTPAndRegister,
  sendOTPForForgotPassword,
  resetPasswordWithOTP,
} from "../Controller/userAuth.Controller.js";

const authRouter = Router();

// Old endpoints (keeping for backward compatibility)
authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);

// New OTP flow endpoints
authRouter.post("/user/send-otp-login", sendOTPForLogin);
authRouter.post("/user/send-otp-register", sendOTPForRegister);
authRouter.post("/user/verify-otp-login", verifyOTPAndLogin);
authRouter.post("/user/verify-otp-register", verifyOTPAndRegister);

// Forgot Password endpoints
authRouter.post("/user/send-otp-forgotpassword", sendOTPForForgotPassword);
authRouter.post("/user/reset-password", resetPasswordWithOTP);

authRouter.get("/users", getUsers);

export default authRouter;