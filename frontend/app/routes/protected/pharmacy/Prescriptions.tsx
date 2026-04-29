import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { FileText, CheckCircle, Clock, Shield, Clipboard, Bell } from "lucide-react";

export function meta() {
  return [{ title: "Pharmacy - Prescriptions" }];
}

const capabilities = [
  { icon: FileText, title: "E-Prescribing", desc: "Direct electronic prescriptions to pharmacies" },
  { icon: CheckCircle, title: "Auto-Verification", desc: "Check interactions, allergies, dosages automatically" },
  { icon: Clock, title: "Refill Management", desc: "Track refills and send renewal reminders" },
  { icon: Shield, title: "Audit Trail", desc: "Complete history of all prescription changes" },
  { icon: Clipboard, title: "Treatment Plans", desc: "Structured medication therapy management" },
  { icon: Bell, title: "Alerts", desc: "Critical drug interaction warnings" },
];

export default function PharmacyPrescriptions() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Prescriptions..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Prescription Management</h1>
          <p className="text-slate-500">
            Electronic prescriptions, refill tracking, and medication history
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
            <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-green-900 dark:text-green-100">
              E-Prescribing Module - In Planning
            </h3>
            <p className="text-green-700 dark:text-green-300 mt-1">
              Streamlined prescription workflows with direct pharmacy integration, 
              automatic refill reminders, and comprehensive medication history tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, index) => (
          <div key={index} className="card p-6 rounded-xl hover:shadow-lg transition-shadow">
            <div className="p-3 bg-primary/5 rounded-lg w-fit mb-4">
              <cap.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{cap.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {cap.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Integration Notice */}
      <div className="card p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-lg mb-4">Planned Integrations</h3>
        <div className="flex flex-wrap gap-3">
          {["Surescripts", "RxNorm", "NCPDP", "e-Prescribing Networks", "Pharmacy Benefit Managers"].map((integration, i) => (
            <span key={i} className="px-4 py-2 bg-muted rounded-full text-sm font-medium">
              {integration}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
