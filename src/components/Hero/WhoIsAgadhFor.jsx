const WhoIsAgadhFor = () => {
  return (
    <section className="px-4 py-16 bg-[hsl(214,100%,97%)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(222,47%,11%)] text-center mb-10">
          Who is Agadh for?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Patients Card */}
          <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-[hsl(221,83%,53%)]/10">
                <svg className="h-6 w-6 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(222,47%,11%)]">Patients</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" />
                <span className="text-[hsl(215,16%,47%)]">Carry lifelong medical history</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" />
                <span className="text-[hsl(215,16%,47%)]">Share records instantly with doctors</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" />
                <span className="text-[hsl(215,16%,47%)]">Full control and transparency</span>
              </li>
            </ul>
          </div>

          {/* Doctors Card */}
          <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-[hsl(221,83%,53%)]/10">
                <svg className="h-6 w-6 text-[hsl(221,83%,53%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[hsl(222,47%,11%)]">Doctors</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" />
                <span className="text-[hsl(215,16%,47%)]">Instant patient context</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" />
                <span className="text-[hsl(215,16%,47%)]">No downloads or data storage</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" />
                <span className="text-[hsl(215,16%,47%)]">Clean, read-only access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsAgadhFor;
