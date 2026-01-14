"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../ui/Navbar";

const DoctorAgreement = () => {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2 text-center">Data Usage Agreement</h1>
        <p className="text-[hsl(215,16%,47%)] text-center mb-8">Your responsibilities when accessing patient records</p>

        <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6 mb-6 space-y-5">
          {[
            { title: "Read-Only Access", desc: "You can only view patient records. No modifications or additions are permitted." },
            { title: "No Downloads", desc: "Patient data cannot be downloaded, copied, or stored on external systems." },
            { title: "Logged Access", desc: "All access to patient records is logged and visible to patients in their access history." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[hsl(214,100%,97%)] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
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
            <span className="text-sm text-[hsl(222,47%,11%)] leading-relaxed">I acknowledge and agree to use patient data solely for consultation purposes and comply with all data protection regulations.</span>
          </label>
        </div>

        <button onClick={() => agreed && router.push("/doctor/dashboard")} disabled={!agreed} className="w-full py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Continue to Dashboard</button>
      </div>
    </div>
  );
};

export default DoctorAgreement;
