import Admin from "../Models/adminAuth.model.js";
import OTP from "../Models/otp.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { createAndSendOTP, verifyOTP } from "../utils/otpService.js";

async function registerAdmin(req, res) {
  const { name, email, password } = req.body;

  // 🔥 Check if ANY admin already exists
  const existingAdmin = await Admin.findOne();

  if (existingAdmin) {
    return res.status(403).json({
      message: "Only one admin is allowed.",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const newAdmin = await Admin.create({
    name: name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: newAdmin._id,
      email: newAdmin.email,
    },
    config.jwtSecret,
    { expiresIn: "1d" }
  );

  return res.status(201).json({
    message: "Admin registered successfully.",
    token,
    admin: {
      id: newAdmin._id,
      email: newAdmin.email,
    },
  });
}




async function loginAdmin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const isMatch =
    crypto.createHash("sha256").update(password).digest("hex") === admin.password;

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const token = jwt.sign(
    {
      id: admin._id,
      email: admin.email,
    },
    config.jwtSecret,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true only in HTTPS (production)
    sameSite: "lax",
  })

  res.status(200).json({
    message: "Admin logged in successfully.",
    token,
    admin: {
      id: admin._id,
      email: admin.email,
    },
  });
}


// ─────────────────────────────────────────
// OTP: Send OTP for Admin Login
// ─────────────────────────────────────────
async function sendOTPForAdminLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required.' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    // Check if admin exists and include password for verification
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (hashedPassword !== admin.password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create and send OTP
    const result = await createAndSendOTP(email, 'LOGIN', 'ADMIN');
    
    if (!result.success) {
      return res.status(500).json({ message: result.message || 'Failed to send OTP.' });
    }

    return res.status(200).json({
      message: 'OTP sent to your email. Valid for 10 minutes.',
      otpId: result.otpId,
    });

  } catch (err) {
    console.error('Send OTP for admin login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// OTP: Verify OTP and Login Admin
// ─────────────────────────────────────────
async function verifyOTPAndLoginAdmin(req, res) {
  try {
    const { email, otp, password } = req.body;

    // Validate inputs
    if (!email || !otp || !password) {
      return res.status(400).json({ message: 'Email, OTP, and password are required.' });
    }

    // Verify OTP first
    const otpVerifyResult = await verifyOTP(email, otp, 'ADMIN');
    
    if (!otpVerifyResult.success) {
      return res.status(400).json({ 
        message: otpVerifyResult.message || 'Invalid or expired OTP.' 
      });
    }

    // OTP verified, now check admin credentials
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Verify password (SHA256 for admin)
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    if (hashedPassword !== admin.password) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      config.jwtSecret,
      { expiresIn: '1d' }
    );

    // Set cookie and respond
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true only in HTTPS (production)
      sameSite: 'lax',
    });

    return res.status(200).json({
      message: 'Admin login successful.',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (err) {
    console.error('Verify OTP and login admin error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// OTP: Send OTP for Admin Registration
// ─────────────────────────────────────────
async function sendOTPForAdminRegister(req, res) {
  try {
    const { email, name, password } = req.body;

    // Validate inputs
    if (!email || !name || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if admin already exists (only 1 admin allowed)
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ message: 'Only one admin is allowed.' });
    }

    // Create and send OTP
    const result = await createAndSendOTP(email, 'REGISTER', 'ADMIN');
    
    if (!result.success) {
      return res.status(500).json({ message: result.message || 'Failed to send OTP.' });
    }

    return res.status(200).json({
      message: 'OTP sent to your email. Valid for 10 minutes.',
      otpId: result.otpId,
    });

  } catch (err) {
    console.error('Send OTP for admin register error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// OTP: Verify OTP and Register Admin
// ─────────────────────────────────────────
async function verifyOTPAndRegisterAdmin(req, res) {
  try {
    const { email, otp, name, password } = req.body;

    // Validate inputs
    if (!email || !otp || !name || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Verify OTP first
    const otpVerifyResult = await verifyOTP(email, otp, 'ADMIN');
    
    if (!otpVerifyResult.success) {
      return res.status(400).json({ 
        message: otpVerifyResult.message || 'Invalid or expired OTP.' 
      });
    }

    // OTP verified, check if admin still doesn't exist (double-check)
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ message: 'Only one admin is allowed.' });
    }

    // Hash password (SHA256 for admin) and create admin
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      {
        id: newAdmin._id,
        email: newAdmin.email,
      },
      config.jwtSecret,
      { expiresIn: '1d' }
    );

    // Set cookie and respond
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true only in HTTPS (production)
      sameSite: 'lax',
    });

    return res.status(201).json({
      message: 'Admin registration successful.',
      token,
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
      },
    });

  } catch (err) {
    console.error('Verify OTP and register admin error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// FORGOT PASSWORD: Send OTP
// ─────────────────────────────────────────
async function sendOTPForAdminForgotPassword(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email and password.' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (hashedPassword !== admin.password) {
      return res.status(401).json({ success: false, message: 'Invalid email and password.' });
    }

    const result = await createAndSendOTP(email, 'FORGOT_PASSWORD', 'ADMIN');
    
    if (!result.success) {
      return res.status(500).json({ success: false, message: result.message || 'Failed to send OTP.' });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email. Valid for 10 minutes.',
      otpId: result.otpId,
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
  }
}


// ─────────────────────────────────────────
// FORGOT PASSWORD: Verify OTP & Reset Password (Admin)
// ─────────────────────────────────────────
async function resetAdminPasswordWithOTP(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Verify OTP
    const otpVerifyResult = await verifyOTP(email, otp, 'ADMIN');
    
    if (!otpVerifyResult.success) {
      return res.status(400).json({ 
        message: otpVerifyResult.message || 'Invalid or expired OTP.' 
      });
    }

    // Find admin and update password
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found.' });
    }

    // Hash new password (SHA256)
    const hashedPassword = crypto
      .createHash('sha256')
      .update(newPassword)
      .digest('hex');
    
    admin.password = hashedPassword;
    await admin.save();

    console.log(`✅ Admin password reset successfully for ${email}`);

    return res.status(200).json({
      message: 'Password reset successfully. Please login with your new password.',
    });

  } catch (err) {
    console.error('Reset admin password error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export { 
  registerAdmin, 
  loginAdmin,
  sendOTPForAdminLogin,
  verifyOTPAndLoginAdmin,
  sendOTPForAdminRegister,
  verifyOTPAndRegisterAdmin,
  sendOTPForAdminForgotPassword,
  resetAdminPasswordWithOTP
};
