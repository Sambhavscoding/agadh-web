import Link from "next/link";

export default function Privacy() {
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
    <span className="font-bold text-2xl text-[hsl(222,47%,11%)]">Agadh</span>
  </Link>
</header>

      {/* Content */}
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
          <h1 className="text-3xl font-bold text-[hsl(222,47%,11%)] mb-8">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">1. Information We Collect</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                Agadh collects personal health information that you voluntarily provide, including medical records, 
                vitals, prescriptions, and diagnostic reports. We also collect basic identification information 
                such as your mobile number and name.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">2. How We Use Your Information</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                Your health data is used solely to facilitate secure sharing with healthcare providers you authorize. 
                We do not sell, rent, or share your personal health information with any third parties without your 
                explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">3. Data Security</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                All health records are encrypted using industry-standard AES-256 encryption both at rest and in transit. 
                Access to your data is controlled through time-bound, consent-based mechanisms that you manage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">4. Consent and Control</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                You maintain complete control over who can access your health records. Access is granted through 
                time-limited QR codes that expire automatically. You can revoke access at any time through your dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">5. Data Retention</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                Your health records are retained for as long as you maintain an active account. You may request 
                complete deletion of your data at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">6. Healthcare Provider Access</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                Healthcare providers are granted read-only access to your records. They cannot download, modify, 
                or retain copies of your health data. All access is logged and visible in your access history.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[hsl(222,47%,11%)] mb-3">7. Contact Us</h2>
              <p className="text-[hsl(215,16%,47%)] leading-relaxed">
                If you have questions about this privacy policy or your health data, please contact us at 
                privacy@agadh.health
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