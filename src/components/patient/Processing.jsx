"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const steps = ["Securing your records...", "Organizing chronologically...", "Preparing your health timeline..."];

export default function Processing() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => { 
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev)); 
    }, 1500);
    
    const timeout = setTimeout(() => { 
      router.push("/patient/dashboard"); 
    }, 5000);
    
    return () => { 
      clearInterval(interval); 
      clearTimeout(timeout); 
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)] px-4 py-8 flex flex-col">
      <header className="mb-8">
        <img 
          src="https://via.placeholder.com/120x40" 
          alt="Agadh logo placeholder" 
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[hsl(214,32%,91%)]" />
            <div className="absolute inset-0 rounded-full border-4 border-[hsl(221,83%,53%)] border-t-transparent animate-spin" />
          </div>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <p key={step} className={`text-lg transition-all duration-300 ${index <= currentStep ? "text-[hsl(222,47%,11%)] opacity-100" : "text-[hsl(215,16%,47%)] opacity-50"}`}>
                {index < currentStep && <span className="text-[hsl(142,76%,36%)] mr-2">✓</span>}
                {step}
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}