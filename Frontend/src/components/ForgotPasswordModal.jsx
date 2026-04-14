import React, { useState } from 'react';
import OTPInput from './OTPInput';

export default function ForgotPasswordModal({ onClose, userType = 'USER' }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [step, setStep] = useState('verify'); // 'verify', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const API_ENDPOINT = userType === 'ADMIN' ? '/api/auth/admin' : '/api/auth/user';

  // Step 1: Verify Email & Password, then Send OTP
  const handleVerifyAndSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_URL}${API_ENDPOINT}/send-otp-forgotpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Invalid email and password');

      setStep('otp');
      setResendCooldown(30);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError('Please enter valid 6-digit OTP');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_URL}${API_ENDPOINT}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Password reset failed');

      // Close modal and redirect to login
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}${API_ENDPOINT}/send-otp-forgotpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to resend OTP');

      setOtp('');
      setError('');
      setResendCooldown(30);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-500 text-sm mt-1">
              {step === 'verify' && 'Verify your email and password'}
              {step === 'otp' && 'Enter the code we sent'}
              {step === 'reset' && 'Create new password'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Verify Email & Password */}
        {step === 'verify' && (
          <form onSubmit={handleVerifyAndSendOTP} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f7a78] outline-none"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f7a78] outline-none"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2f7a78] text-white py-3 rounded-lg font-semibold hover:bg-[#256a68] transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Send OTP'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <form onSubmit={(e) => { e.preventDefault(); setStep('reset'); }} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Enter OTP Code</label>
              <OTPInput
                otp={otp}
                setOtp={setOtp}
                onSubmit={() => setStep('reset')}
                loading={loading}
              />
            </div>

            <div className="text-center text-sm">
              {resendCooldown > 0 ? (
                <p className="text-gray-500">Resend OTP in {resendCooldown}s</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-[#2f7a78] hover:underline font-medium disabled:opacity-50"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep('email')}
              disabled={loading}
              className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              ← Back
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f7a78] outline-none"
                placeholder="Minimum 6 characters"
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f7a78] outline-none"
                placeholder="Re-enter password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2f7a78] text-white py-3 rounded-lg font-semibold hover:bg-[#256a68] transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <button
              type="button"
              onClick={() => setStep('otp')}
              disabled={loading}
              className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              ← Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
