'use client';

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validate as validateEmailFull } from "email-validator";
import { useUser } from "@/src/hooks/UserContext";
import { Checkbox } from "antd";
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState<boolean>(false);
  const router = useRouter();
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setUserEmail } = useUser();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Clears messages on email change
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
    setOtpError("");
  };

  // Handles input for individual OTP boxes
  const handleOtpDigitChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    setOtpError("");
    setError("");
    setSuccess("");

    if (value && index < otpDigits.length - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handles backspace key for individual OTP boxes
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

  // Function to request OTP from backend
  const handleGetOtp = async () => {
    if (!validateEmailFull(email)) {
      setError("Please enter a valid email address format (e.g., your.name@example.com).");
      return;
    }

    // if (!executeRecaptcha) {
    //   setError("reCAPTCHA not loaded. Please refresh and try again.");
    //   return;
    // }

    setLoading(true);
    setError("");
    setSuccess("");
    setOtpError("");

    try {
      // const recaptchaToken = await executeRecaptcha('send_otp'); // Generate reCAPTCHA token for OTP request
      const response = await fetch("/api/joinus/sendotp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setSuccess(data.message || "OTP sent successfully!");
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }

      // Attempt to create user (if not already exists)
      const userResponse = await fetch("/api/user/candidateprofile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const userData = await userResponse.json();
    } catch (apiError) {
      console.error("Error sending OTP:", apiError);
      setError("An unexpected network error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP with backend
  const handleVerifyOtp = async () => {
    const fullOtp = otpDigits.join("");
    if (fullOtp.length !== 6) {
      setOtpError("Please enter a complete 6-digit OTP.");
      return;
    }

    // Validate checkboxes
    if (!termsAgreed) {
      setOtpError("You must agree to the terms and confirm you’ve read the privacy notice.");
      return;
    }

    // if (!newsletterOptIn) {
    //   setOtpError("Please opt-in to receive the weekly newsletter.");
    //   return;
    // }

    if (!executeRecaptcha) {
      setOtpError("reCAPTCHA not loaded. Please refresh and try again.");
      return;
    }

    setLoading(true);
    setOtpError("");
    setError("");
    setSuccess("");

    try {
      // const recaptchaToken = await executeRecaptcha('login_form'); // Generate reCAPTCHA token
      const response = await fetch("/api/joinus/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: fullOtp, termsAgreed, newsletterOptIn }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Login successful!");
        setUserEmail(email);
        router.push("/candidate/candidatedashboard");
      } else {
        setOtpError(data.message || "Invalid or expired OTP. Please try again.");
      }
    } catch (apiError) {
      console.error("Error verifying OTP:", apiError);
      setOtpError("An unexpected error occurred during OTP verification. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Check if all OTP digits are filled to enable the Login button
  const isOtpComplete = otpDigits.every((digit) => digit !== "");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover mt-[66px] bg-center px-4"
      style={{
        backgroundImage: "url('/slider_6.jpg')",
      }}
    >
      <div className="w-full max-w-md backdrop-blur-2xl rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="h2 light font-semibold text-center">Login</h2>

        <div className="space-y-4">
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
              disabled={loading || !email || !validateEmailFull(email)}
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

              <div className="space-y-2">
                <Checkbox
                  checked={newsletterOptIn}
                  onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  disabled={loading}
                  className="text-xs text-white"
                >
                  I’d like to receive MintSurvey’s weekly newsletter
                </Checkbox>
                <Checkbox
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  disabled={loading}
                  className="text-xs text-white"
                >
                  I agree to MintSurvey’s{" "}
                  <a href="/terms" className="text-blue-400 hover:underline">
                    Terms
                  </a>{" "}
                  & confirm I’ve read the{" "}
                  <a href="/privacy" className="text-blue-400 hover:underline">
                    Privacy Notice
                  </a>.
                </Checkbox>
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full b1 py-2 rounded-lg transition font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-blue-default text-white hover:bg-blue-dark"
                disabled={loading || !isOtpComplete || !termsAgreed || !newsletterOptIn}
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

// Wrap the component with GoogleReCaptchaProvider
const LoginPageWithRecaptcha = () => (
  // <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
    <LoginPage />
  // </GoogleReCaptchaProvider>
);

export default LoginPageWithRecaptcha;