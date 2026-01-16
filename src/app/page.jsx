import Link from "next/link";
import { Shield, Eye, Clock } from "lucide-react";
import TrustBadge from "../components/Hero/TrustBadge";
import WhoIsAgadhFor from "../components/Hero/WhoIsAgadhFor";
import HowAgadhWorks from "../components/Hero/HowAgadhWorks";
import LandingCTA from "../components/Hero/LandingCTA";

export default function Landing() {
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
    <span className="font-bold text-2xl text-[hsl(222,47%,11%)]">Agadh</span>
  </Link>
</header>

      {/* Main Content */}
      <main className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[hsl(222,47%,11%)] leading-tight mb-4">
              Your lifelong health history, securely carried across doctors.
            </h1>
            <p className="text-lg text-[hsl(215,16%,47%)] mb-8 max-w-lg mx-auto">
              Share your medical records with healthcare providers through
              consent-driven, time-bound access. You stay in control.
            </p>

            <Link href="/Login">
              <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] transition-colors">
                Login / Access Platform
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
            <TrustBadge
              icon={Shield}
              title="End-to-end encryption"
              description="Your data is encrypted at rest and in transit"
            />
            <TrustBadge
              icon={Eye}
              title="Read-only doctor access"
              description="Doctors can only view, never modify"
            />
            <TrustBadge
              icon={Clock}
              title="Time-bound consent"
              description="Access expires automatically"
            />
          </div>
        </div>
      </main>

      {/* Who Is Agadh For Section */}
      <WhoIsAgadhFor />

      {/* How Agadh Works Section */}
      <HowAgadhWorks />

      {/* CTA Section */}
      <LandingCTA />

      {/* Footer */}
      <footer className="px-4 py-8 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-6 text-sm text-[hsl(215,16%,47%)]">
            <Link href="/Privacy" className="hover:text-[hsl(222,47%,11%)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/Terms" className="hover:text-[hsl(222,47%,11%)] transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-[hsl(215,16%,47%)] mt-4">
            © 2025 Agadh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}