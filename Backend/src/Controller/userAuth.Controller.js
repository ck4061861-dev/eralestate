import User from '../Models/userAuth.Model.js';
import OTP from '../Models/otp.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { createAndSendOTP, verifyOTP } from '../utils/otpService.js';

// ─────────────────────────────────────────
// Helper: Generate Access + Refresh Tokens
// ─────────────────────────────────────────
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    config.refreshSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};


// ─────────────────────────────────────────
// Helper: Set Cookies
// ─────────────────────────────────────────
const setAuthCookies = (res, accessToken, refreshToken) => {
  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,             // 15 minutes
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days
    });
};


// ─────────────────────────────────────────
// Register User
// ─────────────────────────────────────────
async function registerUser(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // bcrypt hash (saltRounds = 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const { accessToken, refreshToken } = generateTokens(newUser);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });

  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// Login User
// ─────────────────────────────────────────
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // bcrypt compare (automatically handles salt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// Refresh Token Controller (Token Rotation)
// Access token expire → verify refresh token
// → issue NEW access + NEW refresh token
// ─────────────────────────────────────────
async function refreshTokenController(req, res) {
  const oldRefreshToken = req.cookies.refreshToken;

  if (!oldRefreshToken) {
    return res.status(401).json({ message: 'No refresh token found. Please login again.' });
  }

  try {
    // Verify the old refresh token
    const decoded = jwt.verify(oldRefreshToken, config.refreshSecret);

    // Make sure user still exists in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found. Please login again.' });
    }

    // 🔄 Rotate: issue brand new access + refresh tokens
    const { accessToken, refreshToken } = generateTokens(user);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      message: 'Tokens refreshed successfully.',
    });

  } catch (err) {
    // Refresh token expired or tampered → force re-login
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(403).json({
      message: 'Session expired. Please login again.',
    });
  }
}


// ─────────────────────────────────────────
// Logout
// ─────────────────────────────────────────
async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ users });
  } catch (err) {
    console.error('Get users error:', err);
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
}

async function logoutUser(req, res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out successfully.' });
}


// ─────────────────────────────────────────
// OTP: Send OTP for Login
// ─────────────────────────────────────────
async function sendOTPForLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required.' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    // Check if user exists and include password for verification
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create and send OTP
    const result = await createAndSendOTP(email, 'LOGIN', 'USER');
    
    if (!result.success) {
      return res.status(500).json({ message: result.message || 'Failed to send OTP.' });
    }

    return res.status(200).json({
      message: 'OTP sent to your email. Valid for 10 minutes.',
      otpId: result.otpId,
    });

  } catch (err) {
    console.error('Send OTP for login error:', err.message);
    return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
}


// ─────────────────────────────────────────
// OTP: Verify OTP and Login
// ─────────────────────────────────────────
async function verifyOTPAndLogin(req, res) {
  try {
    const { email, otp, password } = req.body;

    // Validate inputs
    if (!email || !otp || !password) {
      return res.status(400).json({ message: 'Email, OTP, and password are required.' });
    }

    // Verify OTP first
    const otpVerifyResult = await verifyOTP(email, otp, 'USER');
    
    if (!otpVerifyResult.success) {
      return res.status(400).json({ 
        message: otpVerifyResult.message || 'Invalid or expired OTP.' 
      });
    }

    // OTP verified, now check user credentials
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate tokens and set cookies
    const { accessToken, refreshToken } = generateTokens(user);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (err) {
    console.error('Verify OTP and login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// OTP: Send OTP for Registration
// ─────────────────────────────────────────
async function sendOTPForRegister(req, res) {
  try {
    const { email, name, phone, password } = req.body;

    // Validate inputs
    if (!email || !name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Store temporary registration data in OTP document
    // First, create and send OTP
    const result = await createAndSendOTP(email, 'REGISTER', 'USER');
    
    if (!result.success) {
      return res.status(500).json({ message: result.message || 'Failed to send OTP.' });
    }

    // Store registration data in session/temp storage
    // For now, we'll rely on frontend to resend this data during verification
    // Alternatively, we could store in a temp collection, but keeping it simple
    
    return res.status(200).json({
      message: 'OTP sent to your email. Valid for 10 minutes.',
      otpId: result.otpId,
    });

  } catch (err) {
    console.error('Send OTP for register error:', err.message);
    return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
}


// ─────────────────────────────────────────
// OTP: Verify OTP and Register
// ─────────────────────────────────────────
async function verifyOTPAndRegister(req, res) {
  try {
    const { email, otp, name, phone, password } = req.body;

    // Validate inputs
    if (!email || !otp || !name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Verify OTP first
    const otpVerifyResult = await verifyOTP(email, otp, 'USER');
    
    if (!otpVerifyResult.success) {
      return res.status(400).json({ 
        message: otpVerifyResult.message || 'Invalid or expired OTP.' 
      });
    }

    // OTP verified, check if user still doesn't exist (double-check)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate tokens and set cookies
    const { accessToken, refreshToken } = generateTokens(newUser);
    setAuthCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      message: 'Registration successful.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });

  } catch (err) {
    console.error('Verify OTP and register error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}


// ─────────────────────────────────────────
// FORGOT PASSWORD: Send OTP
// ─────────────────────────────────────────
async function sendOTPForForgotPassword(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email and password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email and password.' });
    }

    const result = await createAndSendOTP(email, 'FORGOT_PASSWORD', 'USER');
    
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
// FORGOT PASSWORD: Verify OTP & Reset Password
// ─────────────────────────────────────────
async function resetPasswordWithOTP(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Verify OTP
    const otpVerifyResult = await verifyOTP(email, otp, 'USER');
    
    if (!otpVerifyResult.success) {
      return res.status(400).json({ 
        message: otpVerifyResult.message || 'Invalid or expired OTP.' 
      });
    }

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    console.log(`✅ Password reset successfully for ${email}`);

    return res.status(200).json({
      message: 'Password reset successfully. Please login with your new password.',
    });

  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export { 
  registerUser, 
  loginUser, 
  refreshTokenController, 
  logoutUser, 
  getUsers,
  sendOTPForLogin,
  verifyOTPAndLogin,
  sendOTPForRegister,
  verifyOTPAndRegister,
  sendOTPForForgotPassword,
  resetPasswordWithOTP
};