"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../ui/Navbar";

const DoctorSetup = () => {
  const [formData, setFormData] = useState({ name: "", clinic: "", specialization: "", city: "", practiceType: "" });
  const router = useRouter();
  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const isValid = Object.values(formData).every((v) => v.trim() !== "");

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2">Complete Your Profile</h1>
        <p className="text-[hsl(215,16%,47%)] mb-8">Tell us about your medical practice</p>

        <form onSubmit={(e) => { e.preventDefault(); router.push("/doctor/agreement"); }} className="space-y-5">
          {[
            { field: "name", label: "Full Name", placeholder: "Dr. John Smith" },
            { field: "clinic", label: "Clinic / Hospital Name", placeholder: "City Health Clinic" },
            { field: "specialization", label: "Specialization", placeholder: "General Medicine, Cardiology, etc." },
            { field: "city", label: "City", placeholder: "Mumbai" },
          ].map((item) => (
            <div key={item.field}>
              <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">{item.label}</label>
              <input type="text" value={formData[item.field]} onChange={(e) => handleChange(item.field, e.target.value)} placeholder={item.placeholder} className="w-full px-4 py-3 rounded-lg border border-[hsl(214,32%,91%)] bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]" required />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">Practice Type</label>
            <select value={formData.practiceType} onChange={(e) => handleChange("practiceType", e.target.value)} className="w-full px-4 py-3 rounded-lg border border-[hsl(214,32%,91%)] bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]">
              <option value="">Select practice type</option>
              <option value="private">Private Practice</option>
              <option value="hospital">Hospital</option>
              <option value="clinic">Multi-specialty Clinic</option>
              <option value="government">Government Hospital</option>
            </select>
          </div>
          <button type="submit" disabled={!isValid} className="w-full py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSetup;
