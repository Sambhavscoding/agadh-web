"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../ui/Navbar";
import { Camera, FileText } from "lucide-react";

const UploadRecords = () => {
  const [files, setFiles] = useState([]);
  const router = useRouter();

  const handleFileUpload = (fileList) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      status: "success",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2">Upload Medical Records</h1>
        <p className="text-[hsl(215,16%,47%)] mb-6">Add your existing prescriptions, lab reports, and medical documents</p>

        <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-[hsl(214,32%,91%)] p-6 text-center mb-6">
          <p className="text-[hsl(222,47%,11%)] font-medium mb-1">Drag and drop files here</p>
          <p className="text-sm text-[hsl(215,16%,47%)]">or use the buttons below</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
  <label className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[hsl(214,100%,97%)] transition-colors">
    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
    <Camera className="w-6 h-6 text-[hsl(221,83%,53%)] mb-2" />
    <span className="text-sm font-medium text-[hsl(222,47%,11%)]">Scan with Camera</span>
  </label>
  <label className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[hsl(214,100%,97%)] transition-colors">
    <input type="file" accept="image/*,.pdf" multiple className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
    <FileText className="w-6 h-6 text-[hsl(221,83%,53%)] mb-2" />
    <span className="text-sm font-medium text-[hsl(222,47%,11%)]">Upload Image/PDF</span>
  </label>
</div>

        {files.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="font-medium text-[hsl(222,47%,11%)]">Uploaded Files</h3>
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[hsl(214,32%,91%)]">
                <span className="flex-1 text-sm text-[hsl(222,47%,11%)] truncate">{file.name}</span>
                <span className="text-[hsl(142,76%,36%)]">✓</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={() => router.push("/patient/upload-vitals")} className="flex-1 py-3 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] font-medium hover:bg-[hsl(214,32%,91%)] transition-colors">
            Skip for now
          </button>
          <button onClick={() => router.push("/patient/upload-vitals")} className="flex-1 py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadRecords;
