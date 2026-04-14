import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "../components/OTPInput";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

function Login() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("credentials"); // "credentials" or "otp"
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/auth/user/send-otp-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setStep("otp");
      setResendCooldown(30);

      // Cooldown timer for resend button
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

  // Step 2: Verify OTP and Login
  const handleVerifyOTP = async (otpCode) => {
    if (otpCode.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      setOtpError("");

      const res = await fetch(`${API_URL}/api/auth/user/verify-otp-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          otp: otpCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("Attempts")) {
          const match = data.message.match(/\d+/);
          if (match) setAttemptsLeft(parseInt(match[0]));
        }
        throw new Error(data.message || "OTP verification failed");
      }

      // ✅ store user
      const storedUser = {
        ...data.user,
        name: data.user?.name || data.user?.email?.split("@")[0] || "User",
      };
      localStorage.setItem("user", JSON.stringify(storedUser));

      // ✅ store access token
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      // 🔥 Redirect to home
      window.location.href = "/";
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      setOtpError("");

      const res = await fetch(`${API_URL}/api/auth/user/send-otp-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");

      setOtp("");
      setAttemptsLeft(null);
      setResendCooldown(30);

      // Cooldown timer
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
      setOtpError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl grid lg:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#1c2430] to-[#111a24] text-white p-10">
          <h1 className="text-3xl xl:text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-300 mb-8 text-sm xl:text-base">
            Sign in to access your dashboard and features.
          </p>
          {/* FEATURES */}
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <span className="text-green-400">✔</span>
              Secure & Fast Authentication
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400">✔</span>
              Access your personalized dashboard
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400">✔</span>
              Track your activity & data easily
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400">✔</span>
              24/7 support available
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {step === "credentials" ? "Sign In" : "Verify Email"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {step === "credentials"
                ? "Enter your credentials"
                : `We sent a code to ${formData.email}`}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* CREDENTIALS STEP */}
          {step === "credentials" && (
            <form onSubmit={handleSendOTP} className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f7a78] outline-none"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2f7a78] outline-none"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              {/* OPTIONS */}
              <div className="flex flex-wrap justify-between items-center text-sm gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  Remember me
                </label>

                <span 
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[#2f7a78] cursor-pointer hover:underline"
                >
                  Forgot password?
                </span>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2f7a78] text-white py-3 rounded-lg font-semibold hover:bg-[#256a68] transition disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Sign In"}
              </button>
            </form>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <div className="space-y-6">
              <OTPInput
                otp={otp}
                setOtp={setOtp}
                onSubmit={handleVerifyOTP}
                loading={loading}
                error={otpError}
                attemptsLeft={attemptsLeft}
              />

              {/* Resend Button */}
              <div className="text-center">
                {resendCooldown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {resendCooldown}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-[#2f7a78] hover:underline font-medium disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setStep("credentials");
                  setOtp("");
                  setOtpError("");
                  setAttemptsLeft(null);
                }}
                className="w-full border border-gray-300 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                ← Back
              </button>
            </div>
          )}

          {/* SOCIAL */}
          {step === "credentials" && (
            <>
              <div className="mt-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <div className="flex-1 h-[1px] bg-gray-300" />
                  OR
                  <div className="flex-1 h-[1px] bg-gray-300" />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = `${API_URL}/api/auth/google`)
                  }
                  className="w-full inline-flex items-center justify-center gap-3 border px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#4285F4"
                      d="M533.5 278.4c0-17.4-1.5-34.2-4.3-50.4H272v95.5h146.9c-6.3 34-25.3 62.8-54 82v68h87.4c51.4-47.4 81.2-117.2 81.2-194.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M272 544.3c73 0 134.3-24.2 179.1-65.6l-87.4-68c-24.3 16.3-55.5 26-91.8 26-70.7 0-130.6-47.7-152-111.8H33.8v70.2c44.7 88.5 136.4 149 238.2 149z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M120 325.1c-10.4-30.8-10.4-63.7 0-94.5V160.4H33.8c-42.7 85.4-42.7 186.4 0 271.8l86.2-70.1z"
                    />
                    <path
                      fill="#EA4335"
                      d="M272 108.4c39.8 0 75.7 13.7 104 40.6l78-78C397.8 24.9 339.8 0 272 0 170.2 0 78.5 60.5 33.8 149L120 219.5c21.4-64.1 81.3-111.8 152-111.8z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-[#2f7a78] font-semibold cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPassword(false)}
          userType="USER"
        />
      )}
    </div>
  );
}

export default Login;
