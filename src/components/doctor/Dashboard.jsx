"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../ui/Navbar";

const mockPatientData = { name: "Rajesh Kumar", age: 45, gender: "Male", bloodGroup: "B+", allergies: ["Penicillin", "Dust"], conditions: ["Type 2 Diabetes", "Hypertension"] };
const mockTimeline = [
  { date: "Dec 2024", title: "Blood Test - HbA1c", type: "Lab Report", value: "7.2%" },
  { date: "Nov 2024", title: "Cardiology Consultation", type: "Consultation", doctor: "Dr. Mehta" },
  { date: "Oct 2024", title: "ECG Report", type: "Diagnostic", result: "Normal sinus rhythm" },
];

const DoctorDashboard = () => {
  const router = useRouter();
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(15 * 60);
  const [qrInput, setQrInput] = useState("");

  useEffect(() => {
    if (!sessionActive) return;
    const timer = setInterval(() => {
      setSessionTime((prev) => {
        if (prev <= 1) { clearInterval(timer); setSessionActive(false); router.push("/system/session-expired"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
}, [sessionActive, router]);

  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  if (!sessionActive) {
    return (
      <div className="min-h-screen bg-[hsl(214,100%,97%)]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[hsl(222,47%,11%)] mb-2">Welcome, Dr. Sharma</h1>
            <p className="text-[hsl(215,16%,47%)]">Ready to view patient records securely</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-[hsl(214,32%,91%)] p-8 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-semibold text-[hsl(222,47%,11%)] mb-3">Scan Patient QR Code</h2>
            <p className="text-[hsl(215,16%,47%)] mb-8 text-sm">Enter the QR code shown by your patient to access their health records</p>
            <input type="text" value={qrInput} onChange={(e) => setQrInput(e.target.value)} placeholder="Enter QR code or scan" className="w-full px-4 py-3 border border-[hsl(214,32%,91%)] rounded-xl bg-[hsl(214,100%,97%)] text-center text-sm placeholder-[hsl(215,16%,47%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] focus:border-transparent mb-6 box-border" />
            <button onClick={() => qrInput.trim() && (setSessionActive(true), setSessionTime(15 * 60), setQrInput(""))} disabled={!qrInput.trim()} className="w-full py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors box-border">Start Session</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="bg-[hsl(221,83%,53%)] text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-medium">READ-ONLY ACCESS • Session expires in {formatTime(sessionTime)}</span>
          <button onClick={() => { setSessionActive(false); setSessionTime(15 * 60); }} className="px-4 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">End Session</button>
        </div>
      </div>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-6 mb-6">
          <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)]">{mockPatientData.name}</h2>
          <p className="text-[hsl(215,16%,47%)]">{mockPatientData.age} years • {mockPatientData.gender} • Blood Group: {mockPatientData.bloodGroup}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-[hsl(0,84%,60%)]/5 rounded-lg border border-[hsl(0,84%,60%)]/20">
              <p className="text-sm font-medium text-[hsl(0,84%,60%)] mb-1">Known Allergies</p>
              <p className="text-[hsl(222,47%,11%)]">{mockPatientData.allergies.join(", ")}</p>
            </div>
            <div className="p-3 bg-[hsl(38,92%,50%)]/5 rounded-lg border border-[hsl(38,92%,50%)]/20">
              <p className="text-sm font-medium text-[hsl(38,92%,50%)] mb-1">Active Conditions</p>
              <p className="text-[hsl(222,47%,11%)]">{mockPatientData.conditions.join(", ")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-6">
          <h3 className="text-lg font-semibold text-[hsl(222,47%,11%)] mb-4">Medical Timeline</h3>
          <div className="space-y-4">
            {mockTimeline.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-[hsl(214,32%,91%)]/50 rounded-lg">
                <div className="text-sm text-[hsl(215,16%,47%)] min-w-[70px]">{item.date}</div>
                <div className="flex-1">
                  <p className="font-medium text-[hsl(222,47%,11%)]">{item.title}</p>
                  <p className="text-sm text-[hsl(215,16%,47%)]">{item.type}</p>
                  {item.value && <p className="text-sm text-[hsl(221,83%,53%)] mt-1">{item.value}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
