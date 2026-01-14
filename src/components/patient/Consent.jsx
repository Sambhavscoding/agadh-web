"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Navbar from "../ui/Navbar";

export default function PatientConsent() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (agreed) router.push("/patient/upload-records");
  };

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-4 py-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2 text-center">Your Data, Your Control</h1>
        <p className="text-[hsl(215,16%,47%)] text-center mb-8">Understand how Agadh protects your health information</p>

        <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6 mb-6 space-y-4">
          {[
            { title: "Data Ownership", desc: "Your health records belong to you. You decide who can view them and for how long." },
            { title: "Consent-Based Access", desc: "Doctors can only view your records when you explicitly grant access via QR code." },
            { title: "Time-Bound Sharing", desc: "Access automatically expires after the time you set. You can revoke access anytime." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[hsl(214,100%,97%)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[hsl(221,83%,53%)]" />
              </div>
              <div>
                <h3 className="font-medium text-[hsl(222,47%,11%)]">{item.title}</h3>
                <p className="text-sm text-[hsl(215,16%,47%)] mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-6 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-[hsl(214,32%,91%)] text-[hsl(221,83%,53%)] focus:ring-[hsl(221,83%,53%)]" />
            <span className="text-sm text-[hsl(222,47%,11%)] leading-relaxed">
              I understand and agree to the <Link href="/privacy" className="text-[hsl(221,83%,53%)] hover:underline">data usage policy</Link>. I consent to Agadh securely storing my health records for sharing with healthcare providers.
            </span>
          </label>
        </div>

        <button onClick={handleContinue} disabled={!agreed} className="w-full py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Proceed
        </button>
      </div>
    </div>
  );
}