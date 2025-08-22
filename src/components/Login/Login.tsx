"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { validate as validateEmailFull } from "email-validator";
import { useUser } from "@/src/hooks/UserContext";
import Swal from "sweetalert2";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setUserEmail } = useUser();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
    setOtpError("");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
    setSuccess("");
    setOtpError("");
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setPhone(val);
    setError("");
    setSuccess("");
    setOtpError("");
  };

  const handleOtpDigitChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length > 1) return;

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otpDigits[index] === "" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleGetOtp = async () => {
    if (!validateEmailFull(email))
      return setError("Please enter a valid email address.");
    if (!name.trim()) return setError("Please enter your full name.");
    if (!phone.trim()) return setError("Please enter your phone number.");

    setLoading(true);
    setError("");
    setSuccess("");
    setOtpError("");

    try {
      const response = await fetch("/api/joinus/sendotp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setSuccess(data.message || "OTP sent successfully!");
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otpDigits.join("");
    if (fullOtp.length !== 6)
      return setOtpError("Please enter a complete 6-digit OTP.");

    setLoading(true);
    setOtpError("");
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/joinus/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: fullOtp, name, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Login successful!");
        setUserEmail(email);

        Swal.fire({
          title: "✅ Verification Successful",
          text: "Thank you for contacting us. We will get back to you shortly. You can now fill in your Rent Agreement details.",
          icon: "success",
          timer: 4000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        setOtpError(data.message || "Invalid or expired OTP.");
      }
    } catch {
      setOtpError("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otpDigits.every((digit) => digit !== "");

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Image */}
      <Image
        src="/hero-property.jpg"
        alt="Background"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 -z-10" />

      {/* Form */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Get Started
        </h2>

        {/* Contact Info Section */}
        <div className="text-center">
          <p className="flex flex-wrap items-center justify-center gap-2 font-semibold text-gray-800 text-base sm:text-lg">
            <span className="animate-phone">📞</span> Need Help? Call Now:
            <a
              href="tel:+919876543210"
              className=" font-bold px-2 text-base sm:text-lg animate-text-combo "
            >
              +91 98765 43210
            </a>
          </p>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              readOnly={otpSent}
              placeholder="Enter your full name"
              disabled={otpSent || loading}
              className="w-full rounded-lg border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              readOnly={otpSent}
              placeholder="Enter your phone number"
              disabled={otpSent || loading}
              className="w-full rounded-lg border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              readOnly={otpSent}
              placeholder="Enter your email"
              disabled={otpSent || loading}
              className="w-full rounded-lg border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Buttons */}
          {!otpSent ? (
            <button
              onClick={handleGetOtp}
              disabled={
                loading ||
                !email ||
                !name.trim() ||
                !phone.trim() ||
                !validateEmailFull(email)
              }
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          ) : (
            <>
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <div className="flex justify-between mt-2 gap-2">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength={1}
                      ref={(el) => {
                        otpInputRefs.current[index] = el;
                      }}
                      placeholder="-"
                      disabled={loading}
                      className="w-12 h-12 text-center text-lg font-semibold border rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || !isOtpComplete}
                className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Login"}
              </button>
            </>
          )}

          {/* Messages */}
          {(error || otpError || (success && otpSent)) && (
            <div className="mt-2 text-center">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
              {success && otpSent && !otpError && (
                <p className="text-green-600 text-sm font-semibold">
                  {success}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
