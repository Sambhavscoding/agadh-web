"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Stethoscope,
  Heart,
  Droplet,
  Scale,
  Trash2,
  CheckCircle,
} from "lucide-react";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    role: "",
    // Patient vitals
    vitals: [],
    patientConsent: false,
    // Doctor fields
    clinic: "",
    specialization: "",
    practiceType: "",
    doctorConsent: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addVitalEntry = (type) => {
    setFormData((prev) => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 9);
      const today = new Date();
      const dateStr = today.toISOString().split("T")[0];

      const newEntry = {
        id: `vital_${timestamp}_${randomStr}`,
        type,
        systolic: "",
        diastolic: "",
        value: "",
        date: dateStr,
      };

      return { ...prev, vitals: [...prev.vitals, newEntry] };
    });
  };

  const updateVital = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      vitals: prev.vitals.map((v) =>
        v.id === id ? { ...v, [field]: value } : v,
      ),
    }));
  };

  const removeVital = (id) => {
    setFormData((prev) => ({
      ...prev,
      vitals: prev.vitals.filter((v) => v.id !== id),
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Base fields
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Invalid phone number";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.role) newErrors.role = "Please select a role";

    // Patient-specific
    if (formData.role === "patient") {
      if (!formData.patientConsent)
        newErrors.patientConsent = "You must agree to the data usage policy";
    }

    // Doctor-specific
    if (formData.role === "doctor") {
      if (!formData.clinic.trim())
        newErrors.clinic = "Clinic/Hospital name is required";
      if (!formData.specialization.trim())
        newErrors.specialization = "Specialization is required";
      if (!formData.practiceType)
        newErrors.practiceType = "Practice type is required";
      if (!formData.doctorConsent)
        newErrors.doctorConsent = "You must agree to the data usage agreement";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    let apiUrl = "";
    let payload = {};

    if (formData.role === "patient") {
      apiUrl = "http://localhost:5000/api/patient/register";

      // Map vitals array to schema structure (pick latest entry for each type)
      const bp = [...formData.vitals].reverse().find((v) => v.type === "bp");
      const sugar = [...formData.vitals]
        .reverse()
        .find((v) => v.type === "sugar");
      const weight = [...formData.vitals]
        .reverse()
        .find((v) => v.type === "weight");

      payload = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        PhoneNumber: formData.phone,
        DOB: formData.dob,
        Address: formData.address,
        user: "patient",
        vitals: {
          blood_pressure: bp
            ? {
                systolic: Number(bp.systolic) || undefined,
                diastolic: Number(bp.diastolic) || undefined,
                date: bp.date || undefined,
              }
            : undefined,
          blood_sugar: sugar
            ? {
                level: Number(sugar.value) || undefined,
                date: sugar.date || undefined,
              }
            : undefined,
          weight: weight
            ? {
                value: Number(weight.value) || undefined,
                date: weight.date || undefined,
              }
            : undefined,
        },
        uploadFiles: [],
      };
    } else if (formData.role === "doctor") {
      apiUrl = "http://localhost:5000/api/doctor/register";
      payload = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        PhoneNumber: formData.phone,
        DOB: formData.dob,
        Address: formData.address,
        hospitalAffiliation: formData.clinic,
        specialization: formData.specialization,
        practiceType: formData.practiceType,
      };
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors({ api: errorData.message || "Registration failed" });
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSubmitting(false);
      router.push("/");
    } catch (err) {
      setErrors({ api: "Network error. Please try again." });
      setIsSubmitting(false);
    }
  };

  const getVitalLabel = (type) => {
    switch (type) {
      case "bp":
        return "Blood Pressure";
      case "sugar":
        return "Blood Sugar";
      case "weight":
        return "Weight";
      default:
        return type;
    }
  };

  const getVitalPlaceholder = (type) => {
    switch (type) {
      case "weight":
        return "70 kg";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)] px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="flex items-center gap-0 no-underline">
          <img
            src="https://ik.imagekit.io/1bsukh3d7/Agadh_logo_high_resol-removebg-preview.png"
            alt="Agadh logo placeholder"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-bold text-2xl text-[hsl(222,47%,11%)]">
            Agad
          </span>
        </Link>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2 text-center">
          Create Your Account
        </h1>
        <p className="text-[hsl(215,16%,47%)] text-center mb-8">
          Join Agad Healthcare Platform
        </p>

        <div className="space-y-6">
          {/* Base Registration Fields */}
          <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
            <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)] mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex justify-start">
                  <div className="w-[260px]">
                    <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      placeholder="John"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.firstName
                          ? "border-red-500"
                          : "border-[hsl(214,32%,91%)]"
                      } bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="w-[260px]">
                    <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder="Doe"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.lastName
                          ? "border-red-500"
                          : "border-[hsl(214,32%,91%)]"
                      } bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[584px]">
                <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-[hsl(214,32%,91%)]"} bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="w-[584px]">
                <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="9876543210"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-[hsl(214,32%,91%)]"} bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="w-[584px]">
                <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.dob ? "border-red-500" : "border-[hsl(214,32%,91%)]"} bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                />
                {errors.dob && (
                  <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                )}
              </div>

              <div className="w-[584px]">
                <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter your full address"
                  rows={2}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.address ? "border-red-500" : "border-[hsl(214,32%,91%)]"} bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] resize-none`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
            <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)] mb-4">
              Select Your Role *
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleChange("role", "patient")}
                className={`p-6 rounded-xl border-2 transition-all ${formData.role === "patient" ? "border-[hsl(221,83%,53%)] bg-[hsl(214,100%,97%)]" : "border-[hsl(214,32%,91%)] hover:border-[hsl(221,83%,53%)]"}`}
              >
                <User className="w-10 h-10 mx-auto mb-2 text-[hsl(221,83%,53%)]" />
                <h3 className="font-semibold text-[hsl(222,47%,11%)]">
                  Patient
                </h3>
                <p className="text-xs text-[hsl(215,16%,47%)] mt-1">
                  Store and share health records
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleChange("role", "doctor")}
                className={`p-6 rounded-xl border-2 transition-all ${formData.role === "doctor" ? "border-[hsl(221,83%,53%)] bg-[hsl(214,100%,97%)]" : "border-[hsl(214,32%,91%)] hover:border-[hsl(221,83%,53%)]"}`}
              >
                <Stethoscope className="w-10 h-10 mx-auto mb-2 text-[hsl(221,83%,53%)]" />
                <h3 className="font-semibold text-[hsl(222,47%,11%)]">
                  Doctor
                </h3>
                <p className="text-xs text-[hsl(215,16%,47%)] mt-1">
                  Access patient records securely
                </p>
              </button>
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs mt-2 text-center">
                {errors.role}
              </p>
            )}
          </div>

          {/* Patient Flow */}
          {formData.role === "patient" && (
            <>
              {/* Upload Vitals Section */}
              <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
                <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)] mb-2">
                  Add Past Vitals
                </h2>
                <p className="text-[hsl(215,16%,47%)] text-sm mb-4">
                  Record your recent health measurements (optional)
                </p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { type: "bp", label: "Blood Pressure", icon: Heart },
                    { type: "sugar", label: "Blood Sugar", icon: Droplet },
                    { type: "weight", label: "Weight", icon: Scale },
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => addVitalEntry(item.type)}
                      className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-4 flex items-center gap-3 hover:bg-[hsl(214,100%,97%)] transition-colors"
                    >
                      <item.icon className="w-6 h-6 text-[hsl(221,83%,53%)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[hsl(222,47%,11%)]">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {formData.vitals.length === 0 ? (
                  <p className="text-center py-4 text-[hsl(215,16%,47%)] text-sm">
                    Tap a vital type above to add an entry
                  </p>
                ) : (
                  <div className="space-y-3">
                    {formData.vitals.map((vital) => (
                      <div
                        key={vital.id}
                        className="bg-[hsl(214,100%,97%)] rounded-lg p-4 border border-[hsl(214,32%,91%)]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-[hsl(222,47%,11%)] text-sm">
                            {getVitalLabel(vital.type)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeVital(vital.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {vital.type === "bp" ? (
                          <div className="grid grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={vital.systolic}
                              onChange={(e) =>
                                updateVital(
                                  vital.id,
                                  "systolic",
                                  e.target.value,
                                )
                              }
                              placeholder="Systolic"
                              className="px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]"
                            />
                            <input
                              type="text"
                              value={vital.diastolic}
                              onChange={(e) =>
                                updateVital(
                                  vital.id,
                                  "diastolic",
                                  e.target.value,
                                )
                              }
                              placeholder="Diastolic"
                              className="px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]"
                            />
                            <input
                              type="date"
                              value={vital.date}
                              onChange={(e) =>
                                updateVital(vital.id, "date", e.target.value)
                              }
                              className="px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={vital.value}
                              onChange={(e) =>
                                updateVital(vital.id, "value", e.target.value)
                              }
                              placeholder={getVitalPlaceholder(vital.type)}
                              className="px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]"
                            />
                            <input
                              type="date"
                              value={vital.date}
                              onChange={(e) =>
                                updateVital(vital.id, "date", e.target.value)
                              }
                              className="px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Patient Consent Section */}
              <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
                <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)] mb-2 text-center">
                  Your Data, Your Control
                </h2>
                <p className="text-[hsl(215,16%,47%)] text-center text-sm mb-6">
                  Understand how Agad protects your health information
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Data Ownership",
                      desc: "Your health records belong to you. You decide who can view them and for how long.",
                    },
                    {
                      title: "Consent-Based Access",
                      desc: "Doctors can only view your records when you explicitly grant access via QR code.",
                    },
                    {
                      title: "Time-Bound Sharing",
                      desc: "Access automatically expires after the time you set. You can revoke access anytime.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(221,83%,53%)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-[hsl(222,47%,11%)]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[hsl(215,16%,47%)] mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`rounded-xl border ${errors.patientConsent ? "border-red-500" : "border-[hsl(214,32%,91%)]"} p-4`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.patientConsent}
                      onChange={(e) =>
                        handleChange("patientConsent", e.target.checked)
                      }
                      className="mt-1 w-4 h-4 rounded border-[hsl(214,32%,91%)] text-[hsl(221,83%,53%)] focus:ring-[hsl(221,83%,53%)]"
                    />
                    <span className="text-sm text-[hsl(222,47%,11%)] leading-relaxed">
                      I understand and agree to the{" "}
                      <Link
                        href="/privacy"
                        className="text-[hsl(221,83%,53%)] hover:underline"
                      >
                        data usage policy
                      </Link>
                      . I consent to Agad securely storing my health records
                      for sharing with healthcare providers. *
                    </span>
                  </label>
                  {errors.patientConsent && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.patientConsent}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Doctor Flow */}
          {formData.role === "doctor" && (
            <>
              {/* Doctor Professional Details */}
              <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
                <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)] mb-2">
                  Professional Details
                </h2>
                <p className="text-[hsl(215,16%,47%)] text-sm mb-4">
                  Tell us about your medical practice
                </p>

                <div className="space-y-4">
                  <div className="w-[586px]">
                    <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                      Clinic / Hospital Name *
                    </label>
                    <input
                      type="text"
                      value={formData.clinic}
                      onChange={(e) => handleChange("clinic", e.target.value)}
                      placeholder="City Health Clinic"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.clinic ? "border-red-500" : "border-[hsl(214,32%,91%)]"} bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                    />
                    {errors.clinic && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.clinic}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                      Specialization *
                    </label>
                    <select
                      value={formData.specialization}
                      onChange={(e) =>
                        handleChange("specialization", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${errors.specialization ? "border-red-500" : "border-[hsl(214,32%,91%)]"} bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                    >
                      <option value="">Select specialization</option>
                      <option value="general">General Medicine</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="psychiatry">Psychiatry</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.specialization && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.specialization}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[hsl(222,47%,11%)] mb-2 block">
                      Practice Type *
                    </label>
                    <select
                      value={formData.practiceType}
                      onChange={(e) =>
                        handleChange("practiceType", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${errors.practiceType ? "border-red-500" : "border-[hsl(214,32%,91%)]"} bg-[hsl(214,100%,97%)] text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)]`}
                    >
                      <option value="">Select practice type</option>
                      <option value="private">Private Practice</option>
                      <option value="hospital">Hospital</option>
                      <option value="clinic">Multi-specialty Clinic</option>
                      <option value="government">Government Hospital</option>
                    </select>
                    {errors.practiceType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.practiceType}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Doctor Agreement Section */}
              <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
                <h2 className="text-lg font-semibold text-[hsl(222,47%,11%)] mb-2 text-center">
                  Data Usage Agreement
                </h2>
                <p className="text-[hsl(215,16%,47%)] text-center text-sm mb-6">
                  Your responsibilities when accessing patient records
                </p>

                <div className="space-y-5 mb-6">
                  {[
                    {
                      title: "Read-Only Access",
                      desc: "You can only view patient records. No modifications or additions are permitted.",
                    },
                    {
                      title: "No Downloads",
                      desc: "Patient data cannot be downloaded, copied, or stored on external systems.",
                    },
                    {
                      title: "Logged Access",
                      desc: "All access to patient records is logged and visible to patients in their access history.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(221,83%,53%)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-[hsl(222,47%,11%)]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[hsl(215,16%,47%)] mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`rounded-xl border ${errors.doctorConsent ? "border-red-500" : "border-[hsl(214,32%,91%)]"} p-4`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.doctorConsent}
                      onChange={(e) =>
                        handleChange("doctorConsent", e.target.checked)
                      }
                      className="mt-1 w-4 h-4 rounded border-[hsl(214,32%,91%)] text-[hsl(221,83%,53%)] focus:ring-[hsl(221,83%,53%)]"
                    />
                    <span className="text-sm text-[hsl(222,47%,11%)] leading-relaxed">
                      I acknowledge and agree to use patient data solely for
                      consultation purposes and comply with all data protection
                      regulations. *
                    </span>
                  </label>
                  {errors.doctorConsent && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.doctorConsent}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          {formData.role && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          )}
        </div>

        <p className="text-center text-sm text-[hsl(215,16%,47%)] mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[hsl(221,83%,53%] hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
