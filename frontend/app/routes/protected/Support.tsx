import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { LifeBuoy, MessageSquare, Ticket, Mail, Phone, CheckCircle, Clock, TrendingUp } from "lucide-react";

export function meta() {
  return [{ title: "Support - Help Desk System" }];
}

const features = [
  {
    icon: Ticket,
    title: "Ticket Management",
    description: "Create, track, and resolve support tickets with priority levels and SLAs",
    status: "Coming Soon"
  },
  {
    icon: MessageSquare,
    title: "Live Chat Support",
    description: "Real-time chat with support staff and AI-powered initial response",
    status: "Phase 2"
  },
  {
    icon: Mail,
    title: "Email Integration",
    description: "Convert emails to tickets with automated categorization and routing",
    status: "Phase 2"
  },
  {
    icon: CheckCircle,
    title: "Knowledge Base",
    description: "Self-service portal with searchable articles and troubleshooting guides",
    status: "Phase 3"
  },
];

export default function Support() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Support..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <LifeBuoy className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Help Desk & Support</h1>
          <p className="text-slate-500">
            Centralized support system for issue tracking and customer service
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-200 dark:border-rose-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg">
            <LifeBuoy className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-rose-900 dark:text-rose-100">
              Support Ticket System - In Development
            </h3>
            <p className="text-rose-700 dark:text-rose-300 mt-1">
              Our comprehensive help desk platform is being developed to provide rapid response 
              times, intelligent ticket routing, and 360-degree patient support case management.
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
            <div className="flex items-start gap-3">
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
            <Clock className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Avg Response Time</span>
          </div>
          <p className="text-2xl font-bold mt-2">&lt;2hr</p>
          <p className="text-xs text-slate-500">Priority 1 tickets</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Resolution Rate</span>
          </div>
          <p className="text-2xl font-bold mt-2">96%</p>
          <p className="text-xs text-slate-500">Same day resolution</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Ticket Volume</span>
          </div>
          <p className="text-2xl font-bold mt-2">342</p>
          <p className="text-xs text-slate-500">Active tickets</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Need immediate assistance? Contact our 24/7 support line or submit a ticket 
          through your portal for non-urgent requests.
        </p>
      </div>
    </div>
  );
}
