import { Router } from 'express';   

import { 
  registerAdmin, 
  loginAdmin,
  sendOTPForAdminLogin,
  verifyOTPAndLoginAdmin,
  sendOTPForAdminRegister,
  verifyOTPAndRegisterAdmin,
  sendOTPForAdminForgotPassword,
  resetAdminPasswordWithOTP
} from '../Controller/adminAuth.controller.js';

const adminAuthRouter = Router();

// Original routes (kept for backward compatibility)
adminAuthRouter.post('/admin/register', registerAdmin);
adminAuthRouter.post('/admin/login', loginAdmin);

// OTP-based authentication routes
adminAuthRouter.post('/admin/send-otp-login', sendOTPForAdminLogin);
adminAuthRouter.post('/admin/verify-otp-login', verifyOTPAndLoginAdmin);
adminAuthRouter.post('/admin/send-otp-register', sendOTPForAdminRegister);
adminAuthRouter.post('/admin/verify-otp-register', verifyOTPAndRegisterAdmin);

// Forgot Password routes
adminAuthRouter.post('/admin/send-otp-forgotpassword', sendOTPForAdminForgotPassword);
adminAuthRouter.post('/admin/reset-password', resetAdminPasswordWithOTP);

export default adminAuthRouter;