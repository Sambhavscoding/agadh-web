import Navbar from "../ui/Navbar";

const accessLogs = [
  { id: 1, doctorName: "Dr. Priya Sharma", clinic: "City Health Clinic", date: "Jan 10, 2024", time: "10:30 AM", status: "expired" },
  { id: 2, doctorName: "Dr. Rajesh Kumar", clinic: "Apollo Hospital", date: "Jan 8, 2024", time: "2:15 PM", status: "expired" },
  { id: 3, doctorName: "Dr. Anita Patel", clinic: "MedCare Diagnostics", date: "Jan 5, 2024", time: "11:00 AM", status: "active" },
];

const AccessHistory = () => {
  return (
    <div className="min-h-screen bg-[hsl(214,100%,97%)]">
      <Navbar />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[hsl(222,47%,11%)] mb-2">Access History</h1>
        <p className="text-[hsl(215,16%,47%)] mb-6">See who has viewed your health records</p>

        <div className="space-y-4">
          {accessLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[hsl(222,47%,11%)]">{log.doctorName}</h3>
                  <p className="text-sm text-[hsl(215,16%,47%)]">{log.clinic}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${log.status === "active" ? "bg-[hsl(221,83%,53%)]/10 text-[hsl(221,83%,53%)]" : "bg-[hsl(214,32%,91%)] text-[hsl(215,16%,47%)]"}`}>
                  {log.status === "active" ? "Active" : "Expired"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[hsl(215,16%,47%)]">
                <span>{log.date}</span>
                <span>•</span>
                <span>{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessHistory;
