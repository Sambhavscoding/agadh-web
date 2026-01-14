"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import Navbar from "../ui/Navbar";

const UploadVitals = () => {
  const [entries, setEntries] = useState([]);
  const router = useRouter();

  const addEntry = (type) => {
    setEntries((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        value: "",
        value2: type === "bp" ? "" : undefined,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const updateEntry = (id, field, value) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const getLabel = (type) => {
    switch (type) {
      case "bp":
        return "Blood Pressure";
      case "sugar":
        return "Blood Sugar";
      case "weight":
        return "Weight";
      default:
        return "";
    }
  };

  const getUnit = (type) => {
    switch (type) {
      case "bp":
        return "mmHg";
      case "sugar":
        return "mg/dL";
      case "weight":
        return "kg";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2">Add Past Vitals</h1>
        <p className="text-[hsl(215,16%,47%)] mb-6">Record your recent health measurements (optional)</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[{ type: "bp", label: "Blood Pressure", emoji: "❤️" }, { type: "sugar", label: "Blood Sugar", emoji: "🩸" }, { type: "weight", label: "Weight", emoji: "⚖️" }].map((item) => (
            <button key={item.type} onClick={() => addEntry(item.type)} className="bg-white rounded-xl shadow-sm border border-[hsl(214,32%,91%)] p-4 text-center hover:bg-[hsl(214,100%,97%)] transition-colors">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <span className="text-xs font-medium text-[hsl(222,47%,11%)]">{item.label}</span>
            </button>
          ))}
        </div>

        {entries.length > 0 && (
          <div className="space-y-4 mb-6">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl shadow-sm border border-[hsl(214,32%,91%)] p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-[hsl(222,47%,11%)]">
                    {getLabel(entry.type)}
                  </h3>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="p-2 hover:bg-[hsl(0,84%,60%)]/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-[hsl(0,84%,60%)]" />
                  </button>
                </div>

                <div className="space-y-6">
                  {entry.type === "bp" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-[hsl(215,16%,47%)] mb-3">Systolic</label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            value={entry.value}
                            onChange={(e) => updateEntry(entry.id, "value", e.target.value)}
                            placeholder="120"
                            className="flex-1 px-4 py-3 bg-[hsl(214,100%,97%)] border border-[hsl(214,32%,91%)] rounded-lg text-[hsl(222,47%,11%)] placeholder-[hsl(215,16%,47%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] focus:border-transparent"
                          />
                          <span className="text-sm text-[hsl(215,16%,47%)] font-medium">/</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[hsl(215,16%,47%)] mb-3">Diastolic</label>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            value={entry.value2 || ""}
                            onChange={(e) => updateEntry(entry.id, "value2", e.target.value)}
                            placeholder="80"
                            className="flex-1 px-4 py-3 bg-[hsl(214,100%,97%)] border border-[hsl(214,32%,91%)] rounded-lg text-[hsl(222,47%,11%)] placeholder-[hsl(215,16%,47%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] focus:border-transparent"
                          />
                          <span className="text-sm text-[hsl(215,16%,47%)] font-medium">{getUnit(entry.type)}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-[hsl(215,16%,47%)] mb-3">Value</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="number"
                          value={entry.value}
                          onChange={(e) => updateEntry(entry.id, "value", e.target.value)}
                          placeholder={entry.type === "sugar" ? "100" : "70"}
                          className="flex-1 px-4 py-3 bg-[hsl(214,100%,97%)] border border-[hsl(214,32%,91%)] rounded-lg text-[hsl(222,47%,11%)] placeholder-[hsl(215,16%,47%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] focus:border-transparent"
                        />
                        <span className="text-sm text-[hsl(215,16%,47%)] font-medium">{getUnit(entry.type)}</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-[hsl(215,16%,47%)] mb-3">Date</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="date"
                        value={entry.date}
                        onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                        className="flex-1 px-4 py-3 bg-[hsl(214,100%,97%)] border border-[hsl(214,32%,91%)] rounded-lg text-[hsl(222,47%,11%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221,83%,53%)] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => addEntry("bp")}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[hsl(214,32%,91%)] rounded-lg text-[hsl(221,83%,53%)] font-medium hover:bg-[hsl(214,100%,97%)] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add another entry
            </button>
          </div>
        )}

        {entries.length === 0 && <p className="text-center py-8 text-[hsl(215,16%,47%)]">Tap a vital type above to add an entry</p>}

        <div className="flex gap-4 mt-6">
          <button onClick={() => router.push("/patient/processing")} className="flex-1 py-3 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,47%,11%)] font-medium hover:bg-[hsl(214,32%,91%)] transition-colors">
            Skip for now
          </button>
          <button onClick={() => router.push("/patient/processing")} className="flex-1 py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVitals;