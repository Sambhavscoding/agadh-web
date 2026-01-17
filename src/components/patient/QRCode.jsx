"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../ui/Navbar";

const durations = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "1 hour", value: 60 },
];

export default function QRCodePage() {
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [qrKey, setQrKey] = useState(0);
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const intervalRef = useRef(null);

  // Helper to get phone number
  const getPhoneNumber = () => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("phoneNumber") ||
        sessionStorage.getItem("phoneNumber") ||
        ""
      );
    }
    return "";
  };

  // Fetch QR code from backend
  const fetchQrCode = async () => {
    setLoading(true);
    setError("");
    const phoneNumber = getPhoneNumber();
    try {
      const res = await fetch(
        `http://localhost:5000/api/patient/qrcode/${phoneNumber}?duration=${selectedDuration}`,
      );
      if (!res.ok) throw new Error("Failed to fetch QR code");
      const data = await res.json();
      setQrImage(data.qrImage);
    } catch (err) {
      setError("Could not load QR code.");
      setQrImage(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch QR code on mount, duration change, or regenerate
  useEffect(() => {
    fetchQrCode();
    // eslint-disable-next-line
  }, [selectedDuration, qrKey]);

  // Timer effect
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [qrKey, selectedDuration]);

  const handleDurationChange = (value) => {
    setSelectedDuration(value);
    setTimeLeft(value * 60);
  };

  const handleRegenerate = () => {
    setQrKey(Date.now());
    setTimeLeft(selectedDuration * 60);
  };

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const isExpired = timeLeft === 0;

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-4 py-6 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2">
          Share with Doctor
        </h1>
        <p className="text-[hsl(215,16%,47%)] mb-6">
          Show this QR code to your healthcare provider
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {durations.map((d) => (
            <button
              key={d.value}
              onClick={() => handleDurationChange(d.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDuration === d.value
                  ? "bg-[hsl(221,83%,53%)] text-white"
                  : "bg-white border border-[hsl(214,32%,91%)] text-[hsl(222,47%,11%)] hover:bg-[hsl(214,100%,97%)]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6 mb-6">
          <div
            className={`w-64 h-64 mx-auto mb-4 rounded-lg flex items-center justify-center ${
              isExpired
                ? "bg-[hsl(214,32%,91%)]"
                : "bg-white border-2 border-[hsl(221,83%,53%)]"
            }`}
          >
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-[hsl(0,84%,60%)]">{error}</p>
            ) : isExpired ? (
              <p className="text-[hsl(215,16%,47%)]">QR Expired</p>
            ) : qrImage ? (
              <img src={qrImage} alt="QR Code" width={200} height={200} />
            ) : (
              <p>No QR code</p>
            )}
          </div>

          <p
            className={`text-2xl font-mono font-bold ${
              isExpired ? "text-[hsl(0,84%,60%)]" : "text-[hsl(222,47%,11%)]"
            }`}
          >
            {formatTime(timeLeft)}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRegenerate}
            className="flex-1 py-3 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] font-medium hover:bg-[hsl(214,32%,91%)] transition-colors"
          >
            Regenerate
          </button>

          <button
            onClick={() => router.push("/patient/dashboard")}
            className="flex-1 py-3 rounded-lg bg-[hsl(0,84%,60%)] text-white font-medium hover:bg-[hsl(0,84%,55%)] transition-colors"
          >
            Revoke Access
          </button>
        </div>
      </div>
    </div>
  );
}
