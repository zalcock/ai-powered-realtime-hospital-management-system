import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { Video, Phone, Stethoscope, FileText, Shield, Users, Mic } from "lucide-react";

export function meta() {
  return [{ title: "Telemedicine - Virtual Consultations" }];
}

const features = [
  {
    icon: Video,
    title: "HD Video Consultations",
    description: "Secure, HIPAA-compliant video calls with screen sharing for medical images",
    status: "Coming Soon"
  },
  {
    icon: Phone,
    title: "Voice-Only Mode",
    description: "Quick phone consultations with call recording and transcription options",
    status: "Phase 2"
  },
  {
    icon: FileText,
    title: "E-Prescribing",
    description: "Send prescriptions directly to pharmacies during virtual visits",
    status: "Phase 2"
  },
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "Military-grade encryption for all communications and stored recordings",
    status: "Phase 3"
  },
];

export default function Telemedicine() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Telemedicine..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Video className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Telemedicine Hub</h1>
          <p className="text-slate-500">
            Virtual care delivery platform for remote consultations and follow-ups
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border border-teal-200 dark:border-teal-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg">
            <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-teal-900 dark:text-teal-100">
              Virtual Care Platform - In Development
            </h3>
            <p className="text-teal-700 dark:text-teal-300 mt-1">
              Our telemedicine solution is being engineered to meet HIPAA and HITECH requirements with 
              ultra-low latency video, integrated EMR access, and automated visit documentation.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="card p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <feature.icon className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium">
                    {feature.status}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Virtual Visits/Month</span>
          </div>
          <p className="text-2xl font-bold mt-2">1,247</p>
          <p className="text-xs text-slate-500">Projected capacity</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Mic className="w-5 h-5 text-rose-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Auto-Transcription</span>
          </div>
          <p className="text-2xl font-bold mt-2">98%</p>
          <p className="text-xs text-slate-500">Speech recognition accuracy</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 text-cyan-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Dept Coverage</span>
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-xs text-slate-500">Specialties supported</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Expand your care reach with virtual visits. Contact our solutions team to pilot the 
          telemedicine platform in your facility.
        </p>
      </div>
    </div>
  );
}
