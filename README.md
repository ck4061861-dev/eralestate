# 🏠 Real Estate Website - Property Management System

A comprehensive real estate platform built with **React**, **Node.js**, **Express**, and **MongoDB**. Features user authentication with OTP verification, property management, bookings, payments, and admin dashboard.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Authentication System](#-authentication-system)
- [Database Models](#-database-models)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🔐 Authentication & Security
- **OTP-Based Login/Register** - 6-digit OTP sent to email, valid for 10 minutes
- **Forgot Password** - Reset password via OTP verification (User & Admin) ⭐
- **Dual User Types** - Support for regular users and admin accounts
- **JWT Tokens** - 15-minute access tokens, 7-day refresh tokens
- **Password Security** - bcrypt hashing for users (12-round), SHA256 for admins
- **Gmail Integration** - SMTP-based email delivery with Nodemailer
- **Attempt Limiting** - Maximum 5 failed OTP attempts before lockout

### 👥 User Management
- **User Registration** - Email verification with OTP
- **User Login** - Two-factor OTP authentication
- **User Profile** - Manage personal information and preferences
- **Password Reset** - Forgot password with OTP recovery ⭐
- **Remember Me** - Login persistence option

### 🏢 Admin Management
- **Admin Registration** - Create admin accounts with OTP verification
- **Admin Login** - OTP-based admin authentication
- **Admin Dashboard** - Manage properties, users, bookings, payments
- **Admin Forgot Password** - SHA256-based password recovery ⭐
- **Role-Based Access** - Admin-specific endpoints and features

### 🏘️ Property Management
- **Property Listing** - Browse available properties with filters
- **Property Details** - View detailed property information, images, amenities
- **Search & Filter** - Filter by location, price, type, amenities
- **Property Categories** - Support for residential, commercial, land
- **Units Management** - Handle multiple units per property

### 📅 Booking System
- **Property Booking** - Schedule property viewings or bookings
- **Booking History** - Track all user bookings
- **Booking Status** - Pending, confirmed, cancelled states
- **Admin Booking Management** - View and manage all bookings

### 💳 Payment Processing
- **Payment Tracking** - Record all payments
- **Payment Status** - Pending, completed, failed, refunded
- **Payment History** - User and admin payment records
- **Invoice Generation** - Generate payment invoices

### 📝 Contracts & Documentation
- **Contract Management** - Create and manage contracts
- **Document Upload** - Upload contract files
- **Contract Status** - Track contract lifecycle

### 🔧 Maintenance & Support
- **Maintenance Requests** - Users can file maintenance requests
- **Maintenance Tracking** - Staff can track and resolve issues
- **Inquiry Management** - Customer inquiries and follow-ups
- **Support Dashboard** - Admin view of all support tickets

### 🎨 Frontend Features
- **Responsive Design** - Mobile, tablet, and desktop support
- **Modern UI** - Tailwind CSS styling with professional look
- **Dynamic Navigation** - Navbar with contextual links
- **Property Cards** - Interactive property display components
- **Modal System** - Professional OTP and password reset modals with blur background ⭐
- **Search Functionality** - Real-time property search
- **Social Integration** - Google OAuth login option
- **Notification Center** - User notifications and updates
- **Consent Banner** - GDPR-compliant cookie/consent management

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Vite** - Modern build tool
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcrypt** - Password hashing (users)
- **Nodemailer** - Email service
- **JWT** - Authentication tokens
- **Crypto** - Password hashing (admins)

### Development Tools
- **npm** - Package manager
- **Git** - Version control

---

## 📁 Project Structure

\\\
Real-Estate-Website/
│
├── Frontend/
│   ├── src/
│   │   ├── Auth/
│   │   │   ├── UserLogin.jsx          # User login with OTP ⭐ Forgot Password
│   │   │   ├── UserRegister.jsx       # User registration
│   │   │   ├── Adminlogin.jsx         # Admin login ⭐ Forgot Password
│   │   │   └── AdminRegister.jsx      # Admin registration
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Navigation bar
│   │   │   ├── Footer.jsx             # Footer component
│   │   │   ├── PropertyCard.jsx       # Property display card
│   │   │   ├── PropertyModal.jsx      # Property details modal
│   │   │   ├── ForgotPasswordModal.jsx # Password reset modal ⭐ NEW
│   │   │   ├── OTPInput.jsx           # 6-digit OTP input
│   │   │   ├── SearchBar.jsx          # Property search
│   │   │   ├── NotificationCenter.jsx # User notifications
│   │   │   ├── ConsentBanner.jsx      # Cookie consent
│   │   │   └── [other components]
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx        # Home page
│   │   │   ├── Properties.jsx         # Properties listing
│   │   │   ├── PropertyDetail.jsx     # Property details
│   │   │   ├── AdminPanel.jsx         # Admin dashboard
│   │   │   ├── Profile.jsx            # User profile
│   │   │   └── [other pages]
│   │   ├── contexts/
│   │   │   └── NotificationContext.js # Global notifications
│   │   ├── App.jsx                    # Main app component
│   │   ├── main.jsx                   # Entry point
│   │   └── index.css                  # Global styles
│   ├── public/
│   │   └── data/                      # Static data files
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── Backend/
│   ├── src/
│   │   ├── Controller/
│   │   │   ├── userAuth.Controller.js        # User auth + forgot pwd ⭐
│   │   │   ├── adminAuth.controller.js       # Admin auth + forgot pwd ⭐
│   │   │   ├── property.controller.js        # Property operations
│   │   │   ├── booking.controller.js         # Booking logic
│   │   │   ├── payment.controller.js         # Payment handling
│   │   │   └── [other controllers]
│   │   ├── Models/
│   │   │   ├── userAuth.Model.js             # User schema
│   │   │   ├── adminAuth.model.js            # Admin schema
│   │   │   ├── otp.model.js                  # OTP schema (TTL: 10 min)
│   │   │   └── [other models]
│   │   ├── Routes/
│   │   │   ├── userAuth.Routes.js            # User endpoints + forgot pwd ⭐
│   │   │   ├── adminAuth.route.js            # Admin endpoints + forgot pwd ⭐
│   │   │   └── [other routes]
│   │   ├── Middleware/
│   │   │   └── userAuth.Middleware.js        # JWT verification
│   │   ├── config/
│   │   │   ├── database.js                   # MongoDB connection
│   │   │   └── config.js                     # App configuration
│   │   ├── utils/
│   │   │   └── otpService.js                 # OTP generation & sending
│   │   └── app.js                            # Express app setup
│   ├── server.js                             # Server entry point
│   ├── uploads/                              # File uploads directory
│   ├── package.json
│   └── .env                                  # Environment variables
│
├── Documentation/
│   ├── AUTHENTICATION_GUIDE.md                # Complete auth documentation ⭐
│   ├── TESTING_FORGOT_PASSWORD.md             # Test cases ⭐
│   └── GMAIL_SETUP.md                         # Gmail configuration
│
├── README.md                                  # This file
└── .gitignore
\\\

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Atlas or local)
- **npm** or **yarn**
- **Gmail Account** (for OTP emails)

### Backend Setup

1. **Navigate to backend folder**
   \\\ash
   cd Backend
   \\\

2. **Install dependencies**
   \\\ash
   npm install
   \\\

3. **Create \.env\ file in Backend directory**
   \\\env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

   # JWT Secrets
   JWT_ACCESS_SECRET=your_access_secret_key_here
   JWT_REFRESH_SECRET=your_refresh_secret_key_here
   JWT_ACCESS_EXPIRY=15m
   JWT_REFRESH_EXPIRY=7d

   # Gmail SMTP (for OTP emails)
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=your-app-password-16-chars

   # Server
   PORT=3000
   NODE_ENV=development
   \\\

4. **Setup Gmail Credentials**
   - Enable 2-Step Verification: https://myaccount.google.com/security
   - Create App Password: https://myaccount.google.com/apppasswords
   - Select \"Mail\" and \"Windows Computer\"
   - Copy 16-character password to \.env\ as GMAIL_PASSWORD

5. **Start backend server**
   \\\ash
   npm start
   \\\
   Expected: Server running on \http://localhost:3000\

### Frontend Setup

1. **Navigate to frontend folder** (in new terminal)
   \\\ash
   cd Frontend
   \\\

2. **Install dependencies**
   \\\ash
   npm install
   \\\

3. **Create \.env\ file in Frontend directory**
   \\\env
   VITE_API_URL=http://localhost:3000
   \\\

4. **Start frontend development server**
   \\\ash
   npm run dev
   \\\
   Expected: Frontend running on \http://localhost:5173\

5. **Access the application**
   - Open browser: \http://localhost:5173\
   - Login: \http://localhost:5173/login\
   - Admin Login: \http://localhost:5173/admin/login\

---

## 📖 Usage Guide

### User Registration & Login

**Step 1: Register**
1. Go to \/register\
2. Enter email, name, and password
3. Click \"Sign Up\"
4. Enter OTP from email
5. Account created ✅

**Step 2: Login**
1. Go to \/login\
2. Enter email and password
3. Click \"Sign In\"
4. Enter OTP from email
5. Redirected to home page ✅

**Step 3: Forgot Password** ⭐ NEW
1. On login page, click \"Forgot password?\"
2. Modal opens with email input
3. Enter registered email, click \"Send OTP\"
4. Enter OTP from email in next step
5. Enter new password (min 6 characters)
6. Confirm password and click \"Reset Password\"
7. Modal closes automatically
8. Login with new password ✅

### Admin Operations

**Admin Registration**
- Go to \/admin/register\
- Similar to user registration
- Creates admin account with SHA256 password hashing

**Admin Dashboard**
- Login as admin at \/admin/login\
- Access admin panel at \/admin\ or \/admin/dashboard\
- Manage: Properties, Bookings, Payments, Users, Contracts, Maintenance

**Admin Forgot Password** ⭐ NEW
- Click \"Forgot password?\" on admin login page
- Same flow as user forgot password
- Password stored with SHA256 hashing

### Property Management
1. Browse properties on landing page
2. Use search bar to filter by location/price
3. Click property card for details
4. View property modal with images and info

### Bookings & Payments
- Access your profile for booking history
- View payment status and invoices
- Track maintenance requests

---

## 🔗 API Documentation

### Authentication Endpoints - NEW ⭐

#### User Forgot Password
| Method | Endpoint | Description |
|--------|----------|-------------|
| \POST\ | \/api/auth/user/send-otp-forgotpassword\ | Send password reset OTP |
| \POST\ | \/api/auth/user/reset-password\ | Reset password with OTP |

#### Admin Forgot Password
| Method | Endpoint | Description |
|--------|----------|-------------|
| \POST\ | \/api/auth/admin/send-otp-forgotpassword\ | Send admin password reset OTP |
| \POST\ | \/api/auth/admin/reset-password\ | Reset admin password with OTP |

#### User Full Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| \POST\ | \/api/auth/user/send-otp-register\ | Send registration OTP |
| \POST\ | \/api/auth/user/verify-otp-register\ | Verify OTP & create account |
| \POST\ | \/api/auth/user/send-otp-login\ | Send login OTP |
| \POST\ | \/api/auth/user/verify-otp-login\ | Verify OTP & login |

#### Admin Full Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| \POST\ | \/api/auth/admin/send-otp-register\ | Send admin registration OTP |
| \POST\ | \/api/auth/admin/verify-otp-register\ | Verify OTP & create admin |
| \POST\ | \/api/auth/admin/send-otp-login\ | Send admin login OTP |
| \POST\ | \/api/auth/admin/verify-otp-login\ | Verify OTP & admin login |

### Request/Response Examples - NEW ⭐

**Send OTP for Password Reset:**
\\\javascript
POST /api/auth/user/send-otp-forgotpassword
Content-Type: application/json

{
  \"email\": \"user@example.com\"
}

Response (200):
{
  \"success\": true,
  \"message\": \"OTP sent to your email\"
}
\\\

**Reset Password:**
\\\javascript
POST /api/auth/user/reset-password
Content-Type: application/json

{
  \"email\": \"user@example.com\",
  \"otp\": \"123456\",
  \"newPassword\": \"newpass123\"
}

Response (200):
{
  \"success\": true,
  \"message\": \"Password reset successfully\"
}
\\\

---

## 🔐 Authentication System

### OTP Features ⭐
- **6-digit random code** - 1 million possible combinations
- **10-minute expiry** - TTL index auto-deletes expired OTPs
- **5 attempt limit** - Lockout after failed attempts
- **Types**: LOGIN, REGISTER, FORGOT_PASSWORD ⭐
- **Email delivery** - Via Gmail SMTP
- **Resend functionality** - 30-second cooldown timer

### Password Security ⭐
- **User passwords** - bcrypt with 12-round salt
- **Admin passwords** - SHA256 hashing (upgrade from bcrypt)
- **Token expiry** - 15-minute access tokens, 7-day refresh
- **Secure storage** - Secrets in \.env\, not in codebase
- **No plain text** - Passwords and secrets never exposed

### Forgot Password Flow ⭐
\\\
1. User clicks \"Forgot password?\"
   ↓
2. Modal opens with email input
   ↓
3. User enters email → Send OTP
   ↓
4. OTP sent to email (valid 10 minutes)
   ↓
5. Modal shows OTP input (6 digits)
   ↓
6. User enters OTP → Verify OTP
   ↓
7. OTP verified → Show password reset UI
   ↓
8. User enters new password → Reset
   ↓
9. Modal closes automatically
   ↓
10. User can now login with new password ✅
\\\

---

## 📊 Database Models

### OTP Schema (with TTL) ⭐
\\\javascript
{
  email: String,
  otp: String (6 digits),
  type: String (\"LOGIN\", \"REGISTER\", \"FORGOT_PASSWORD\"), // NEW type ⭐
  userType: String (\"USER\", \"ADMIN\"),
  isVerified: Boolean,
  attempts: Number (0-5),
  createdAt: Date (TTL: 600 seconds = 10 minutes),
  expiresAt: Date (auto-delete)
}
\\\

### User Schema
\\\javascript
{
  email: String (unique),
  password: String (bcrypt hashed),
  name: String,
  phone: String,
  address: String,
  role: String (\"USER\"),
  createdAt: Date,
  updatedAt: Date
}
\\\

### Admin Schema
\\\javascript
{
  email: String (unique),
  password: String (SHA256 hashed),
  adminId: String (unique),
  role: String (\"ADMIN\"),
  createdAt: Date,
  updatedAt: Date
}
\\\

---

## 🎯 What's New in v2.0 - Complete Forgot Password Feature ⭐

### Frontend Changes
- **New Component**: \ForgotPasswordModal.jsx\ - Professional 3-step modal
  - Step 1: Email input with send OTP
  - Step 2: OTP verification with resend (30-sec cooldown)
  - Step 3: New password entry with confirmation
  - Auto-close on success
  - Blur background overlay
  - Supports USER and ADMIN types

- **Updated Components**:
  - \UserLogin.jsx\ - Added forgotten password link and modal integration
  - \AdminLogin.jsx\ - Added admin forgotten password with same modal

### Backend Changes
- **New Controller Functions**:
  - \sendOTPForForgotPassword()\ in userAuth.Controller.js
  - \esetPasswordWithOTP()\ in userAuth.Controller.js
  - \sendOTPForAdminForgotPassword()\ in adminAuth.controller.js
  - \esetAdminPasswordWithOTP()\ in adminAuth.controller.js

- **New Routes**:
  - \POST /api/auth/user/send-otp-forgotpassword\
  - \POST /api/auth/user/reset-password\
  - \POST /api/auth/admin/send-otp-forgotpassword\
  - \POST /api/auth/admin/reset-password\

- **Updated Models**:
  - OTP type enum now includes \"FORGOT_PASSWORD\" ⭐

### Documentation
- **AUTHENTICATION_GUIDE.md** - Complete authentication system documentation
- **TESTING_FORGOT_PASSWORD.md** - 14 comprehensive test cases
- **GMAIL_SETUP.md** - Step-by-step Gmail configuration

---

## 🧪 Testing Forgot Password

Run through test cases in \TESTING_FORGOT_PASSWORD.md\:

- Test Case 1: User Happy Path ✅
- Test Case 2: Admin Happy Path ✅
- Test Case 3: Invalid Email ✅
- Test Case 4: Invalid OTP ✅
- Test Case 5: Max Attempts ✅
- Test Case 6: OTP Expiry ✅
- Test Case 7: Resend Cooldown ✅
- Test Case 8: Password Validation ✅
- Test Case 9: Gmail Delivery ✅
- Test Case 10: Navigation ✅
- Test Case 11: UI/UX ✅
- Test Case 12: Cross-Browser ✅
- Test Case 13: User Hashing (bcrypt) ✅
- Test Case 14: Admin Hashing (SHA256) ✅

---

## 🚀 Deployment

### Vercel (Frontend)
\\\ash
npm run build
# Deploy build folder to Vercel
\\\

### Railway/Heroku (Backend)
\\\ash
# Configure environment variables
# Push code to platform
\\\

### MongoDB Atlas
- Create cluster
- Enable IP whitelist
- Configure backups

---

## 📞 Support

For detailed documentation, see:
- \AUTHENTICATION_GUIDE.md\ - Full auth system details
- \TESTING_FORGOT_PASSWORD.md\ - Test procedures
- \GMAIL_SETUP.md\ - Email configuration

---

**Version**: 2.0  
**Last Updated**: April 6, 2026  
**Status**: ✅ Active Development

⭐ **v2.0 Features**: Complete Forgot Password system with OTP, professional modal UI, comprehensive documentation, and 14 test cases.
