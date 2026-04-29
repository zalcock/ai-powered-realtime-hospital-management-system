import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { FlaskConical, Microscope, FileImage, Search, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";

export function meta() {
  return [{ title: "Laboratory - Test Requests" }];
}

const workflowSteps = [
  { icon: Search, title: "Order Entry", desc: "Physicians order lab tests with clinical notes" },
  { icon: FileImage, title: "Sample Tracking", desc: "Barcode-based specimen collection and tracking" },
  { icon: Microscope, title: "Results Processing", desc: "Lab techs enter results with normal ranges" },
  { icon: CheckCircle, title: "AI Analysis", desc: "Optional AI-powered interpretation assistance" },
  { icon: AlertTriangle, title: "Critical Alerts", desc: "Automatic flagging of urgent results" },
];

export default function LabTestRequests() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Laboratory..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <FlaskConical className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Laboratory Test Requests</h1>
          <p className="text-slate-500">
            Order, track, and manage laboratory tests and results
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
            <Microscope className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100">
              Laboratory Information System - In Development
            </h3>
            <p className="text-purple-700 dark:text-purple-300 mt-1">
              Comprehensive lab management with test ordering, specimen tracking, 
              results entry, and AI-assisted diagnosis support for radiology and pathology.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {workflowSteps.map((step, index) => (
          <div key={index} className="card p-5 rounded-xl text-center relative">
            {index < workflowSteps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
            )}
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
              <step.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold mb-1">{step.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Test Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6 rounded-xl border-l-4 border-l-blue-500">
          <h3 className="font-bold text-lg mb-3">Hematology</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Complete blood count, coagulation studies, blood typing
          </p>
          <span className="text-sm font-medium text-blue-600">12+ test panels</span>
        </div>
        <div className="card p-6 rounded-xl border-l-4 border-l-green-500">
          <h3 className="font-bold text-lg mb-3">Chemistry</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Comprehensive metabolic panel, liver function, electrolytes
          </p>
          <span className="text-sm font-medium text-green-600">20+ analytes</span>
        </div>
        <div className="card p-6 rounded-xl border-l-4 border-l-purple-500">
          <h3 className="font-bold text-lg mb-3">Radiology</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            X-ray, CT, MRI viewing with AI-assisted analysis
          </p>
          <span className="text-sm font-medium text-purple-600">DICOM support</span>
        </div>
      </div>

      {/* AI Feature Highlight */}
      <div className="card p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">AI-Powered Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Future integration with Google's Gemini AI for automated X-ray analysis, 
              abnormal detection highlighting, and preliminary diagnostic suggestions 
              to accelerate radiologist workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
