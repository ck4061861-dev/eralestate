import dotenv from 'dotenv';
dotenv.config();

if(!process.env.PORT){
  throw new Error("PORT is not defined in environment variables");
}
if(!process.env.MONGODB_URL){
  throw new Error("MONGODB_URL is not defined in environment variables");
}
if(!process.env.jwtSecret){
  throw new Error("jwtSecret is not defined in environment variables");
}
if(!process.env.refreshSecret){
  throw new Error("refreshSecret is not defined in environment variables");
}

// ✅ Gmail Configuration Validation
const gmailUser = process.env.GMAIL_USER?.trim();
const gmailPassword = process.env.GMAIL_PASSWORD?.replace(/\s+/g, '');

if (!gmailUser || gmailUser === 'your-email@gmail.com') {
  console.warn('⚠️ WARNING: GMAIL_USER not configured properly in .env');
  console.warn('   OTP emails will not be sent until Gmail is configured.');
}

if (!gmailPassword || gmailPassword === 'your-app-password') {
  console.warn('⚠️ WARNING: GMAIL_PASSWORD not configured properly in .env');
  console.warn('   OTP emails will not be sent until Gmail is configured.');
}

const config = {
  port: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  jwtSecret: process.env.jwtSecret,
  refreshSecret: process.env.refreshSecret,
  gmailUser: gmailUser,
  gmailPassword: gmailPassword,
};

export default config;
