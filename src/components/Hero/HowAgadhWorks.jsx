const steps = [
  {
    title: "Upload your records",
    description: "Securely upload your medical documents, prescriptions, and test results",
  },
  {
    title: "Organize your history",
    description: "Your health data is organized chronologically into a clear timeline",
  },
  {
    title: "Generate a QR code",
    description: "Create a time-bound QR code to share with your healthcare provider",
  },
  {
    title: "Doctor views securely",
    description: "Doctor scans and views your records in read-only mode with no downloads",
  },
];

const HowAgadhWorks = () => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(222,47%,11%)] text-center mb-4">
          How Agadh Works
        </h2>
        <p className="text-[hsl(215,16%,47%)] text-center mb-12 max-w-lg mx-auto">
          A simple, secure process to share your health history
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[hsl(221,83%,53%)] text-white flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-6 h-full pt-6">
                <div className="p-3 rounded-xl bg-[hsl(221,83%,53%)]/10 w-fit mb-4">
                  {index === 0 && (
                    <svg className="h-6 w-6 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="h-6 w-6 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="h-6 w-6 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg className="h-6 w-6 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold text-[hsl(222,47%,11%)] mb-2">{step.title}</h3>
                <p className="text-sm text-[hsl(215,16%,47%)]">{step.description}</p>
              </div>

              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-6 h-0.5 bg-[hsl(214,32%,91%)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowAgadhWorks;
