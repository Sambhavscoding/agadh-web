import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)] px-4 py-8">
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
    <span className="font-bold text-2xl text-[hsl(222,47%,11%)]">Agad</span>
  </Link>
</header>

      {/* Content */}
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
          <h1 className="text-3xl font-bold text-[hsl(222,47%,11%)] mb-8">Terms of Service</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">1. Acceptance of Terms</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                By accessing and using Agad, you agree to be bound by these Terms of Service. If you do not 
                agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">2. Service Description</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                Agad is a health records management platform that enables patients to securely store and share 
                their medical records with healthcare providers. We facilitate the sharing process but do not 
                provide medical advice or diagnoses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">3. Healthcare Disclaimer</h2>
              <div className="p-4 bg-[hsl(214,100%,97%)] rounded-lg border border-[hsl(214,32%,91%)]">
                <p className="text-[hsl(222,47%,11%)] font-medium mb-2">Important Notice:</p>
                <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                  Agad is NOT a diagnostic service. The information stored and shared through our platform 
                  should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician or other qualified health provider with any questions 
                  you may have regarding a medical condition.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">4. User Responsibilities</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                You are responsible for maintaining the accuracy of your health records and ensuring that 
                access is granted only to authorized healthcare providers. You must not share your QR codes 
                with unauthorized individuals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">5. Healthcare Provider Obligations</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                Healthcare providers agree to use patient data solely for consultation purposes. They may not 
                copy, download, or retain patient data beyond the authorized access period. All access is logged 
                and subject to audit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">6. Limitation of Liability</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                Agad shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your use of or inability to use the service. We are not responsible 
                for medical decisions made based on information shared through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">7. Emergency Situations</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                In case of medical emergencies, healthcare providers may access critical health information 
                necessary for emergency treatment without prior consent, as permitted by applicable healthcare 
                regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">8. Modifications</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after 
                changes constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-[hsl(214,32%,91%)]">
            <p className="text-sm text-[hsl(215,16%,47%)]">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}