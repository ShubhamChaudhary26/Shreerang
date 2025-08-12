'use client';

import React, { useState, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { validate as validateEmailFull } from "email-validator";
import { useUser } from "@/src/hooks/UserContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");          // add name state
  const [phone, setPhone] = useState<string>("");        // add phone state
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setUserEmail } = useUser();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
    setOtpError("");
  };

  // New handlers for name and phone
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
    setSuccess("");
    setOtpError("");
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Optional: phone validation can be added here
    setPhone(e.target.value);
    setError("");
    setSuccess("");
    setOtpError("");
  };

  const handleOtpDigitChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (val.length > 1) return;
    if (val && !/^\d$/.test(val)) return;

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = val;
    setOtpDigits(newOtpDigits);
    setOtpError("");
    setError("");
    setSuccess("");

    if (val && index < otpDigits.length - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otpDigits[index] === "" && index > 0) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index - 1] = "";
      setOtpDigits(newOtpDigits);
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "Backspace" && otpDigits[index] !== "") {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = "";
      setOtpDigits(newOtpDigits);
    }
  };

  const handleGetOtp = async () => {
    if (!validateEmailFull(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setOtpError("");

    try {
      const response = await fetch("/api/joinus/sendotp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, phone }), // send name and phone too
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setSuccess(data.message || "OTP sent successfully!");
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otpDigits.join("");
    if (fullOtp.length !== 6) {
      setOtpError("Please enter a complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    setOtpError("");
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/joinus/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Login successful!");
        setUserEmail(email);

        if (data.redirectTo) {
          router.push(data.redirectTo);
        } else {
          router.push("/");
        }
      } else {
        setOtpError(data.message || "Invalid or expired OTP.");
      }
    } catch (err) {
      setOtpError("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otpDigits.every((digit) => digit !== "");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover mt-[66px] bg-center px-4"
      style={{ backgroundImage: "url('/slider_6.jpg')" }}
    >
      <div className="w-full max-w-md backdrop-blur-2xl rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="h2 light font-semibold text-center">Login</h2>

        <div className="space-y-4">
           {/* Name input */}
          <div>
            <label htmlFor="name" className="p2 block h5 font-medium text-white">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              readOnly={otpSent}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              placeholder="Enter your full name"
              disabled={otpSent || loading}
            />
          </div>

          {/* Phone input */}
          <div>
            <label htmlFor="phone" className="p2 block h5 font-medium text-white">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              readOnly={otpSent}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              placeholder="Enter your phone number"
              disabled={otpSent || loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="p2 block h5 font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              readOnly={otpSent}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              placeholder="Enter your email"
              disabled={otpSent || loading}
            />
          </div>

         

          {!otpSent ? (
            <button
              onClick={handleGetOtp}
              className="w-full b1 py-2 rounded-lg transition font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-blue-default text-white hover:bg-blue-dark"
              disabled={loading || !email || !name.trim() || !phone.trim() || !validateEmailFull(email)}
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          ) : (
            <>
              <div>
                <label htmlFor="otp" className="block h5 font-medium text-white">
                  OTP
                </label>
                <div className="flex justify-center space-x-2 mt-1">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength={1}
                      ref={(el) => {
                        otpInputRefs.current[index] = el;
                      }}
                      className="w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      placeholder="-"
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full b1 py-2 rounded-lg transition font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-blue-default text-white hover:bg-blue-dark"
                disabled={loading || !isOtpComplete}
              >
                {loading ? "Verifying..." : "Login"}
              </button>
            </>
          )}

          {(error || otpError || (success && otpSent)) && (
            <div className="mt-2 text-center">
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              {otpError && <p className="text-red-500 text-sm font-medium">{otpError}</p>}
              {success && otpSent && !otpError && (
                <p className="text-green-400 text-sm font-bold">{success}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
