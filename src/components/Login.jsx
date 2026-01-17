"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setIsLoading(true);
      try {
        // Store phone number in sessionStorage or pass via URL params
       
        const res = await fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ PhoneNumber: phoneNumber }),
        });
        // Optionally, check response status here
        if (res.ok) {
          const data = await res.json();
           localStorage.setItem("phoneNumber", phoneNumber);
           console.log(res);
           localStorage.setItem("role", data.user.user);
           router.push("/Otp");
        }

        
      } catch (error) {
        // Handle error (optional)
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)] px-4 py-8 flex flex-col">
      {/* Header */}
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
            Agadh
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
            <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] text-center mb-2">
              Welcome to Agadh
            </h1>
            <p className="text-[hsl(215,16%,47%)] text-center mb-8">
              Enter your mobile number to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block"
                >
                  Mobile Number
                </label>
                <div className="flex">
                  <div className="flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-[hsl(214,32%,91%)] bg-[hsl(214,32%,91%)] text-[hsl(215,16%,47%)] font-medium">
                    +91
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    placeholder="Enter 10-digit number"
                    className="flex-1 px-4 py-3 rounded-r-lg border border-[hsl(214,32%,91%)] bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] placeholder:text-[hsl(215,16%,47%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] focus:border-transparent transition-all"
                    required
                  />
                </div>
                <p className="text-xs text-[hsl(215,16%,47%)] mt-2">
                  We&apos;ll send you a one-time verification code
                </p>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10 || isLoading}
                className="w-full py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-[hsl(215,16%,47%)]">
          By continuing, you agree to our{" "}
          <Link
            href="/Privacy"
            className="text-[hsl(221,83%,53%)] hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/Terms"
            className="text-[hsl(221,83%,53%)] hover:underline"
          >
            Terms of Service
          </Link>
        </p>
      </footer>
    </div>
  );
}
