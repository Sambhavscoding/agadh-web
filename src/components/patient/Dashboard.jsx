"use client";

import { useState } from "react";
import Link from "next/link";
import { QrCode, FileText, Clock } from "lucide-react";
import Navbar from "../ui/Navbar";

export default function PatientDashboard() {
  const [hasRecords] = useState(true);
  const recentReports = [
    { id: 1, name: "Blood Test Report", date: "Jan 5, 2024", type: "Lab" },
    { id: 2, name: "Chest X-Ray", date: "Dec 28, 2023", type: "Imaging" },
    { id: 3, name: "Prescription - Dr. Sharma", date: "Dec 20, 2023", type: "Rx" },
  ];
  const vitals = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg" },
    { label: "Blood Sugar", value: "95", unit: "mg/dL" },
    { label: "Weight", value: "72", unit: "kg" },
  ];

  const quickActions = [
    { to: "/patient/qr", label: "Share QR", icon: QrCode },
    { to: "/patient/upload-records", label: "Add Records", icon: FileText },
    { to: "/patient/access-history", label: "Access Log", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-6 py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[hsl(222,47%,11%)]">Welcome back!</h1>
          <p className="text-[hsl(215,16%,47%)] mt-1">Your health records are secure and ready</p>
        </div>

        {/* Quick Actions */}
       <div className="grid grid-cols-3 gap-6 mb-8">
  {quickActions.map((item) => {
    const Icon = item.icon;
    return (
      <Link key={item.to} href={item.to} className="bg-white rounded-2xl shadow-sm border border-[hsl(214,32%,91%)] p-8 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 no-underline">
        <Icon className="w-10 h-10 text-[hsl(221,83%,53%)] mb-4" />
        <span className="text-sm font-semibold text-[hsl(222,47%,11%)]">{item.label}</span>
      </Link>
    );
  })}
</div>

        {/* Vitals Snapshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(214,32%,91%)] p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)]">Vitals Snapshot</h2>
          </div>
          <div className="grid grid-cols-3 gap-12">
            {vitals.map((vital) => (
              <div key={vital.label} className="text-center">
                <p className="text-4xl font-bold text-[hsl(222,47%,11%)] mb-1">{vital.value}</p>
                <p className="text-xs text-[hsl(215,16%,47%)] mb-2">{vital.unit}</p>
                <p className="text-sm font-medium text-[hsl(222,47%,11%)]">{vital.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(214,32%,91%)] p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[hsl(221,83%,53%)]" />
              <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)]">Recent Reports</h2>
            </div>
            <Link href="/patient/access-history" className="text-[hsl(221,83%,53%)] hover:text-[hsl(221,83%,48%)] text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-[hsl(214,100%,97%)] hover:bg-[hsl(214,32%,91%)] transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="w-5 h-5 text-[hsl(221,83%,53%)] shrink-0" />
                  <div>
                    <p className="font-medium text-[hsl(222,47%,11%)]">{report.name}</p>
                    <p className="text-xs text-[hsl(215,16%,47%)]">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-white text-[hsl(215,16%,47%)] font-medium">{report.type}</span>
                  <svg className="w-5 h-5 text-[hsl(215,16%,47%)] group-hover:text-[hsl(222,47%,11%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}