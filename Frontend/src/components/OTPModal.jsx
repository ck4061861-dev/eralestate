import React, { useState } from 'react';
import OTPInput from './OTPInput';

export default function OTPModal({ email, onVerify, onBack, loading = false }) {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleVerify = async (otpCode) => {
    await onVerify(otpCode);
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      setOtpError('');
      setOtp('');
      setAttemptsLeft(null);

      // Call backend to resend OTP (this will be handled by parent)
      // Parent component should trigger the resend
      await new Promise((resolve) => {
        setResendCooldown(30);
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              resolve();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      });
    } catch (err) {
        console.error('Resend OTP error:', err);
        setOtpError('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Verify Email</h2>
          <p className="text-gray-500 text-sm mt-2">We sent a code to {email}</p>
        </div>

        {/* Error Message */}
        {otpError && (
          <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-3 rounded mb-6 text-sm">
            <p className="font-medium">{otpError}</p>
            {attemptsLeft && attemptsLeft > 0 && (
              <p className="text-xs mt-1">Attempts remaining: {attemptsLeft}</p>
            )}
          </div>
        )}

        {/* OTP Input */}
        <OTPInput
          otp={otp}
          setOtp={setOtp}
          onSubmit={handleVerify}
          loading={loading}
          error={otpError}
          attemptsLeft={attemptsLeft}
        />

        {/* Resend Button */}
        <div className="text-center mt-6">
          {resendCooldown > 0 ? (
            <p className="text-sm text-gray-500">Resend OTP in {resendCooldown}s</p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || loading}
              className="text-sm text-blue-600 hover:underline font-medium disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="w-full mt-6 border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
