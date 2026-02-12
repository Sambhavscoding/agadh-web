"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function OTP() {
  // Initialize phone state with a function to get value from sessionStorage
  const [phone] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("phoneNumber") || "XXXXXXXXXX";
    }
    return "XXXXXXXXXX";
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
  ];

  useEffect(() => {
    // Only focus the input, no state updates
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    // Dummy OTP check
    if (otpValue !== "123456") {
      setError("Invalid OTP. Please try again.");
      setIsLoading(false);
      return;
    }

    // Get role from localStorage
    let role = "new";
    if (typeof window !== "undefined") {
      role = localStorage.getItem("role") || "new";
    }

    // Role-based redirect
    if (role === "patient") {
      router.push("/patient/dashboard");
    } else if (role === "Doctor") {
      router.push("/doctor/dashboard");
    } else {
      router.push("/Register");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)] px-4 py-8 flex flex-col">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <header className="mb-8">
          <Link href="/" className="flex items-center gap-0 no-underline">
            <img
              src="https://ik.imagekit.io/1bsukh3d7/Agadh_logo_high_resol-removebg-preview.png"
              alt="Agadh logo placeholder"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-bold text-2xl text-[hsl(222,47%,11%)]">
              Agad
            </span>
          </Link>
        </header>
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,47%,11%)]"
          >
            {languages.find((l) => l.code === language)?.label}
            <ChevronDown className="h-4 w-4" />
          </button>
          {showLangMenu && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-[hsl(214,32%,91%)] rounded-lg shadow-lg py-1 z-10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-[hsl(214,32%,91%)] ${language === lang.code ? "text-[hsl(221,83%,53%)]" : "text-[hsl(222,47%,11%)]"}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
            <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] text-center mb-2">
              Verify your number
            </h1>
            <p className="text-[hsl(215,16%,47%)] text-center mb-8">
              Enter the 6-digit code sent to +91{" "}
              {phone.slice(-4).padStart(10, "X")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div
                  className="flex justify-center gap-3"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-14 text-center text-xl font-semibold rounded-lg border ${
                        error
                          ? "border-[hsl(0,84%,60%)]"
                          : "border-[hsl(214,32%,91%)]"
                      } bg-[hsl(214,100%,97%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] transition-all`}
                      maxLength={1}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-[hsl(0,84%,60%)] text-sm text-center mt-3">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </button>

              <p className="text-center text-sm text-[hsl(215,16%,47%)]">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  className="text-[hsl(221,83%,53%)] hover:underline rounded-lg"
                >
                  Resend OTP
                </button>
              </p>
            </form>

            <div className="mt-6 p-3 rounded-lg bg-[hsl(214,100%,97%)] text-center">
              <p className="text-xs text-[hsl(215,16%,47%)]">
                Demo: Use OTP{" "}
                <span className="font-mono font-semibold">123456</span> to
                continue
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
