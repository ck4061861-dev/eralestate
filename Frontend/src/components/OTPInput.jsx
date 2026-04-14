import React, { useRef} from 'react';

export default function OTPInput({ otp, setOtp, onSubmit, loading = false, error = null, attemptsLeft = null }) {
  const inputRefs = useRef([]);

  // Handle input change - move to next input on digit entry
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Move to next input if digit entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace - move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste - distribute digits across OTP fields
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length > 0) {
      setOtp(digits.padEnd(6, ''));
      // Focus on next empty field or last field
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* OTP Input Fields */}
      <div className="flex justify-center gap-2 sm:gap-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={otp[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            placeholder="•"
            className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold border-2 rounded-lg transition-all ${
              error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
            disabled={loading}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center">
          <p className="text-sm text-red-600 font-medium">{error}</p>
          {attemptsLeft && attemptsLeft > 0 && (
            <p className="text-xs text-red-500 mt-1">
              Attempts remaining: {attemptsLeft}
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={() => onSubmit(otp)}
        disabled={otp.length !== 6 || loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          otp.length === 6 && !loading
            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Verifying...
          </span>
        ) : (
          'Verify OTP'
        )}
      </button>
    </div>
  );
}
