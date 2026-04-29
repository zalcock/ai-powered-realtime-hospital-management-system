import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { FileImage, Brain, Stethoscope, Scan, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function meta() {
  return [{ title: "Laboratory - Results Entry" }];
}

const resultFeatures = [
  { icon: Scan, title: "Digital Entry", desc: "Direct input of test values with auto-calculated ranges" },
  { icon: Brain, title: "AI Assistance", desc: "Gemini AI analysis for imaging and pathology interpretation" },
  { icon: Stethoscope, title: "Clinician Review", desc: "Secure review and sign-off by authorized physicians" },
  { icon: CheckCircle, title: "Auto-Verification", desc: "Automated validation of critical values and results" },
  { icon: Clock, title: "Turnaround Time", desc: "Track and optimize lab processing times" },
  { icon: AlertTriangle, title: "Critical Alerts", desc: "Immediate notifications for life-threatening results" },
];

export default function LabResultsEntry() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Results Entry..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <FileImage className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Results Entry & Analysis</h1>
          <p className="text-slate-500">
            Laboratory results entry with AI-assisted diagnosis support
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
            <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">
              AI-Enhanced Results Module - In Development
            </h3>
            <p className="text-indigo-700 dark:text-indigo-300 mt-1">
              Advanced results entry with integrated AI analysis for medical imaging 
              (X-rays, CT scans) and pathology. Automated abnormality detection 
              and preliminary diagnostic suggestions coming soon.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultFeatures.map((feature, index) => (
          <div key={index} className="card p-5 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{feature.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Example AI Analysis */}
      <div className="card p-6 rounded-xl mt-8">
        <h3 className="font-bold text-lg mb-4">Sample AI Analysis Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">No Fracture Detected</p>
                <p className="text-sm text-slate-600">Left wrist X-ray - within normal limits</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium">Minor Incidental Finding</p>
                <p className="text-sm text-slate-600">Right knee - mild degenerative changes</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-sm text-slate-500 text-center">
              AI overlay visualization will appear here with highlighted regions of interest,
              confidence scores, and supporting evidence from training data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
