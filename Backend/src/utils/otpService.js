import nodemailer from 'nodemailer';
import OTP from '../Models/otp.model.js';

// ✅ Validate Gmail Credentials
const validateGmailCredentials = () => {
  const user = process.env.GMAIL_USER?.trim();
  const password = process.env.GMAIL_PASSWORD?.replace(/\s+/g, '');

  if (!user || user === 'your-email@gmail.com' || !password || password === 'your-app-password') {
    console.error('❌ ERROR: Gmail credentials not configured in .env file!');
    console.error('Please set:');
    console.error('  GMAIL_USER=your-gmail@gmail.com');
    console.error('  GMAIL_PASSWORD=your-app-password (16-char password from Google)');
    return false;
  }

  if (process.env.GMAIL_PASSWORD && process.env.GMAIL_PASSWORD.includes(' ')) {
    console.warn('⚠️ WARNING: GMAIL_PASSWORD contains spaces. App passwords are 16 characters without spaces.');
  }

  return true;
};

// Setup nodemailer transporter
let transporter;
let isGmailConfigured = validateGmailCredentials();

if (isGmailConfigured) {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER?.trim(),
      pass: process.env.GMAIL_PASSWORD?.replace(/\s+/g, ''),
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    maxConnections: 5,
    maxMessages: 50,
  });

  // Test the connection
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Gmail Connection Failed:', error.message);
      if (error.code) console.error('   Error code:', error.code);
      if (error.response) console.error('   SMTP response:', error.response.toString());
      isGmailConfigured = false;
    } else {
      console.log('✅ Gmail SMTP Connected Successfully');
    }
  });
}

// Generate random 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
export const sendOTPEmail = async (email, otp, userType = 'USER') => {
  if (!isGmailConfigured) {
    console.warn('⚠️ Gmail not configured. OTP saved to DB only: ' + otp);
    return false;
  }

  try {
    const mailOptions = {
      from: process.env.GMAIL_USER?.trim(),
      to: email,
      subject: `Property Next ${userType === 'ADMIN' ? 'Admin' : 'User'} - OTP Verification`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #2f7a78 0%, #256a68 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 24px;">Property Next</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">Email Verification</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Hello,</p>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">
              Your One-Time Password (OTP) for ${userType === 'ADMIN' ? 'Admin' : 'User'} authentication is:
            </p>
            
            <div style="background: #f5f5f5; border: 3px solid #2f7a78; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;">
              <h1 style="color: #2f7a78; letter-spacing: 5px; margin: 0; font-size: 48px; font-weight: bold;">${otp}</h1>
            </div>
            
            <div style="background: #fffacd; border-left: 4px solid #ffa500; padding: 15px; border-radius: 4px; margin: 25px 0;">
              <p style="margin: 0; color: #cc6600; font-weight: bold;">⏰ This OTP will expire in 10 minutes</p>
            </div>
            
            <p style="color: #666; font-size: 13px; line-height: 1.6; margin-top: 25px; border-top: 1px solid #eee; padding-top: 15px;">
              ❌ If you didn't request this OTP, please ignore this email or contact support.
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
              Property Next | Secure Authentication System<br>
              Never share your OTP with anyone
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP Sent to ${email} | Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error sending OTP email to ${email}:`, error.message);
    if (error.code) console.error('   Error code:', error.code);
    if (error.response) console.error('   SMTP response:', error.response.toString());
    return false;
  }
};

// Create and send OTP
export const createAndSendOTP = async (email, type = 'LOGIN', userType = 'USER') => {
  try {
    // Delete previous OTPs for this email/userType combo
    await OTP.deleteMany({ email, userType });

    // Generate unique 6-digit OTP
    const otp = generateOTP();
    
    // Set expiration: 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log(`📧 Creating OTP for ${email} | Type: ${type} | UserType: ${userType}`);

    // Save OTP to database
    const otpRecord = await OTP.create({
      email,
      otp,
      type,
      userType,
      expiresAt,
    });

    console.log(`💾 OTP saved to DB | ID: ${otpRecord._id} | Expires at: ${expiresAt}`);

    const emailSent = await sendOTPEmail(email, otp, userType);
    if (!emailSent) {
      await OTP.deleteOne({ _id: otpRecord._id });
      console.error(`❌ OTP delivery failed for ${email}. Deleted OTP record ${otpRecord._id}`);
      return {
        success: false,
        message: 'Failed to send OTP email. Please check email configuration or try again.',
      };
    }

    return {
      success: true,
      message: 'OTP sent to your email successfully. Valid for 10 minutes.',
      otpId: otpRecord._id,
    };
  } catch (error) {
    console.error('❌ Error in createAndSendOTP:', error);
    return {
      success: false,
      message: error.message || 'Failed to create OTP',
    };
  }
};

// Verify OTP
export const verifyOTP = async (email, otp, userType = 'USER') => {
  try {
    console.log(`🔍 Verifying OTP for ${email} | Type: ${userType}`);

    const otpRecord = await OTP.findOne({
      email,
      userType,
      isVerified: false,
    });

    if (!otpRecord) {
      console.warn(`⚠️ OTP not found for ${email}`);
      return {
        success: false,
        message: 'OTP not found or already verified',
      };
    }

    // Check if OTP expired
    if (new Date() > otpRecord.expiresAt) {
      console.warn(`⏰ OTP expired for ${email}`);
      await OTP.deleteOne({ _id: otpRecord._id });
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.',
      };
    }

    // Increment attempts
    otpRecord.attempts += 1;

    // Check if too many attempts (5 attempts max)
    if (otpRecord.attempts > 5) {
      console.error(`❌ Too many failed attempts for ${email}`);
      await OTP.deleteOne({ _id: otpRecord._id });
      return {
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.',
      };
    }

    // Compare OTP values
    if (otpRecord.otp !== otp) {
      await otpRecord.save();
      const attemptsRemaining = 5 - otpRecord.attempts;
      console.warn(`❌ Invalid OTP for ${email} | Attempts left: ${attemptsRemaining}`);
      return {
        success: false,
        message: `Invalid OTP. ${attemptsRemaining} attempts remaining.`,
      };
    }

    // ✅ OTP verified successfully
    otpRecord.isVerified = true;
    await otpRecord.save();
    console.log(`✅ OTP verified successfully for ${email}`);

    return {
      success: true,
      message: 'OTP verified successfully',
    };
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    throw error;
  }
};
