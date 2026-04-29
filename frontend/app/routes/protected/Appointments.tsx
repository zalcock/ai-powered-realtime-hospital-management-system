import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { Calendar, Clock, User, Stethoscope, Bell, ClipboardList, Video } from "lucide-react";

export function meta() {
  return [{ title: "Appointments - Scheduling & Management" }];
}

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered appointment booking with conflict detection and automated reminders",
    status: "Coming Soon"
  },
  {
    icon: Clock,
    title: "Waitlist Management",
    description: "Real-time waitlist optimization with SMS/email notifications for cancellations",
    status: "Phase 2"
  },
  {
    icon: Stethoscope,
    title: "Provider Availability",
    description: "Dynamic scheduling based on doctor schedules, specialties, and room availability",
    status: "Phase 2"
  },
  {
    icon: Video,
    title: "Hybrid Appointments",
    description: "Seamless integration of in-person and telemedicine visits in unified calendar",
    status: "Phase 3"
  },
];

export default function Appointments() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Appointments..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Appointment Management</h1>
          <p className="text-slate-500">
            Streamline patient scheduling and optimize provider time allocation
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
            <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100">
              Intelligent Scheduling System - In Development
            </h3>
            <p className="text-purple-700 dark:text-purple-300 mt-1">
              Our next-generation appointment platform will reduce no-shows by 40% with smart reminders, 
              automated follow-ups, and real-time schedule optimization across all departments.
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
            <ClipboardList className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Daily Appointments</span>
          </div>
          <p className="text-2xl font-bold mt-2">284</p>
          <p className="text-xs text-slate-500">Avg across all departments</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Avg Wait Time</span>
          </div>
          <p className="text-2xl font-bold mt-2">12min</p>
          <p className="text-xs text-slate-500">Room turnover time</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">On-Time Rate</span>
          </div>
          <p className="text-2xl font-bold mt-2">94%</p>
          <p className="text-xs text-slate-500">Schedule adherence</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Want to optimize your scheduling workflow? Join our beta program for early access to 
          advanced calendar features and analytics.
        </p>
      </div>
    </div>
  );
}
