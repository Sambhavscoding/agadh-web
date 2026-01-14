"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

// Mock role state - in real app would come from auth context
const useRole = (pathname) => {
  if (pathname.startsWith("/patient")) return "patient";
  if (pathname.startsWith("/doctor")) return "doctor";
  return "guest";
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const role = useRole(pathname);

  const isActive = (path) => pathname === path;
  const languages = ["English", "हिंदी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ"];

  // Guest navigation items
  const guestItems = [
    { to: "/landing", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/role-select", label: "Get Started" },
  ];

  // Patient navigation items
  const patientItems = [
    { to: "/patient/dashboard", label: "Dashboard", icon: "grid" },
    { to: "/patient/upload-records", label: "Upload Records", icon: "upload" },
    { to: "/patient/access-history", label: "Access History", icon: "history" },
  ];

  // Doctor navigation items
  const doctorItems = [
    { to: "/doctor/dashboard", label: "Dashboard" },
  ];

  const getNavItems = () => {
    if (role === "patient") return patientItems;
    if (role === "doctor") return doctorItems;
    return guestItems;
  };

  const navItems = getNavItems();
  const isFixed = role === "patient" || role === "doctor";

  const handleLogout = () => {
    setShowProfileMenu(false);
    setIsOpen(false);
    router.push("/Login");
  };

  // Apply body padding dynamically based on navbar state
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isFixed) {
        document.body.classList.add("pt-20");
      } else {
        document.body.classList.remove("pt-20");
      }
    }
  }, [isFixed]);

  return (
    <nav className={`${isFixed ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 bg-white border-b border-[hsl(214,32%,91%)]`}>
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={role === "guest" ? "/landing" : role === "patient" ? "/patient/dashboard" : "/doctor/dashboard"} className="flex items-center gap-3 shrink-0">
          <img src="https://ik.imagekit.io/1bsukh3d7/agadh%20logo.png?updatedAt=1768358174702" alt="Agadh logo" className="h-10" />
          <span className="font-bold text-lg text-[hsl(222,47%,11%)]">Agadh</span>
        </Link>

        {/* Doctor Read-only Badge */}
        {role === "doctor" && (
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[hsl(221,83%,53%)]/5 rounded-full text-xs text-[hsl(221,83%,53%)] font-medium">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Read-only Access
          </div>
        )}

        {/* Desktop Navigation - Left side with Dashboard */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-start pl-8">
          {navItems.map((item) => {
            const getIcon = (iconType) => {
              switch (iconType) {
                case "grid":
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>;
                case "upload":
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
                case "history":
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                default:
                  return null;
              }
            };
            
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.to)
                    ? "text-[hsl(221,83%,53%)]"
                    : "text-[hsl(215,16%,47%)] hover:text-[hsl(221,83%,53%)]"
                }`}
              >
                {item.icon && getIcon(item.icon)}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: Generate QR Button + Profile */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Patient: Generate QR Button */}
          {role === "patient" && (
            <Link href="/patient/qr">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[hsl(221,83%,53%)] text-white text-sm font-medium hover:bg-[hsl(221,83%,48%)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Generate QR
              </button>
            </Link>
          )}

          {/* Profile Dropdown (Patient & Doctor only) */}
          {(role === "patient" || role === "doctor") && (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 rounded-full bg-[hsl(221,83%,53%)]/10 text-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,53%)]/20 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-[hsl(214,32%,91%)] rounded-2xl shadow-lg py-3 z-50">
                  {role === "doctor" && (
                    <>
                      <div className="px-4 py-3 border-b border-[hsl(214,32%,91%)]">
                        <p className="font-semibold text-[hsl(222,47%,11%)]">Dr. Sharma</p>
                        <p className="text-xs text-[hsl(215,16%,47%)]">General Medicine</p>
                        <p className="text-xs text-[hsl(215,16%,47%)]">City Health Clinic</p>
                      </div>
                    </>
                  )}

                  {role === "patient" && (
                    <>
                      <div className="px-4 py-3 border-b border-[hsl(214,32%,91%)]">
                        <p className="font-semibold text-[hsl(222,47%,11%)]">My Account</p>
                      </div>
                      <button
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-[hsl(222,47%,11%)] hover:bg-[hsl(214,100%,97%)] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          Language
                        </span>
                        <svg className="h-4 w-4 text-[hsl(215,16%,47%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {showLanguageMenu && (
                        <div className="absolute left-full top-0 w-40 bg-white border border-[hsl(214,32%,91%)] rounded-lg shadow-lg py-2 ml-2">
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => {
                                setLanguage(lang);
                                setShowLanguageMenu(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-[hsl(214,32%,91%)] ${language === lang ? "text-[hsl(221,83%,53%)] bg-[hsl(221,83%,53%)]/5" : "text-[hsl(222,47%,11%)]"}`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,60%)]/5 transition-colors border-t border-[hsl(214,32%,91%)]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-[hsl(214,32%,91%)] transition-colors"
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[hsl(214,32%,91%)] shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {/* Doctor Read-only Badge Mobile */}
            {role === "doctor" && (
              <div className="flex items-center gap-1.5 px-4 py-2 bg-[hsl(221,83%,53%)]/5 rounded-lg text-xs text-[hsl(221,83%,53%)] font-medium mb-2">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Read-only Access Mode
              </div>
            )}

            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? "bg-[hsl(221,83%,53%)]/10 text-[hsl(221,83%,53%)]"
                    : "text-[hsl(215,16%,47%)] hover:text-[hsl(222,47%,11%)] hover:bg-[hsl(214,32%,91%)]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Patient: Generate QR Button Mobile */}
            {role === "patient" && (
              <Link href="/patient/qr" onClick={() => setIsOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg bg-[hsl(221,83%,53%)] text-white text-sm font-medium">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  Generate QR
                </button>
              </Link>
            )}

            {/* Doctor Profile Mobile */}
            {role === "doctor" && (
              <div className="px-4 py-3 border-t border-[hsl(214,32%,91%)] mt-2">
                <p className="font-semibold text-[hsl(222,47%,11%)]">Dr. Sharma</p>
                <p className="text-sm text-[hsl(215,16%,47%)]">General Medicine</p>
                <p className="text-sm text-[hsl(215,16%,47%)]">City Health Clinic</p>
              </div>
            )}

            {/* Patient Language Selection Mobile */}
            {role === "patient" && (
              <div className="pt-3 border-t border-[hsl(214,32%,91%)] mt-3 space-y-1">
                <div className="px-4 py-2 text-xs font-medium text-[hsl(215,16%,47%)] uppercase">
                  Language
                </div>
                <div className="flex flex-wrap gap-2 px-4">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        language === lang
                          ? "bg-[hsl(221,83%,53%)] text-white"
                          : "bg-[hsl(214,32%,91%)] text-[hsl(215,16%,47%)] hover:bg-[hsl(214,32%,86%)]"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Logout for Patient & Doctor */}
            {(role === "patient" || role === "doctor") && (
              <div className="pt-2 border-t border-[hsl(214,32%,91%)]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,60%)]/10"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
