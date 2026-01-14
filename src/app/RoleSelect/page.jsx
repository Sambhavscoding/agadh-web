"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, FlaskConical } from "lucide-react";

export default function RoleSelect() {
  const router = useRouter();

  const handleRoleSelect = (role) => {
    if (role === "patient") {
      router.push("/patient/consent");
    } else {
      router.push("/doctor/setup");
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)] px-4 py-8 flex flex-col">
      {/* Header */}
      <header className="mb-8">
        <Link href="/">
          <img
            src="https://ik.imagekit.io/1bsukh3d7/agadh%20logo.png?updatedAt=1768358174702" 
            alt="Agadh logo placeholder" 
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2">
              How will you use Agadh?
            </h1>
            <p className="text-[hsl(215,16%,47%)]">
              Choose your role to get started
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Patient Card */}
            <button
              onClick={() => handleRoleSelect("patient")}
              className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6 text-left hover:border-[hsl(221,83%,53%)] hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-[hsl(214,100%,97%)] flex items-center justify-center mb-4 group-hover:bg-[hsl(221,83%,53%)]/10 transition-colors">
                <User className="w-7 h-7 text-[hsl(221,83%,53%)]" />
              </div>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-2">
                Patient
              </h2>
              <p className="text-[hsl(215,16%,47%)] text-sm">
                Manage and share your health records securely with healthcare providers
              </p>
            </button>

            {/* Doctor Card */}
            <button
              onClick={() => handleRoleSelect("doctor")}
              className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6 text-left hover:border-[hsl(221,83%,53%)] hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-[hsl(214,100%,97%)] flex items-center justify-center mb-4 group-hover:bg-[hsl(221,83%,53%)]/10 transition-colors">
                <FlaskConical className="w-7 h-7 text-[hsl(221,83%,53%)]" />
              </div>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-2">
                Doctor
              </h2>
              <p className="text-[hsl(215,16%,47%)] text-sm">
                View patient history with their consent during consultations
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}