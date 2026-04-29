import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { MessageCircle, Star, Send, AlertCircle, BarChart3, Users } from "lucide-react";

export function meta() {
  return [{ title: "Feedback - User Feedback System" }];
}

const features = [
  {
    icon: MessageCircle,
    title: "Feedback Collection",
    description: "Capture structured feedback from patients and staff across multiple touchpoints",
    status: "Coming Soon"
  },
  {
    icon: Star,
    title: "Satisfaction Surveys",
    description: "Automated CSAT and NPS surveys with customizable question templates",
    status: "Coming Soon"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time sentiment analysis and trend identification from feedback data",
    status: "Phase 2"
  },
  {
    icon: AlertCircle,
    title: "Critical Alerts",
    description: "Immediate notification for negative feedback requiring urgent attention",
    status: "Phase 2"
  },
];

export default function Feedback() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Feedback..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Feedback & Surveys</h1>
          <p className="text-slate-500">
            Collect and analyze user feedback to improve patient experience
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-yellow-900 dark:text-yellow-100">
              Patient Experience Platform - In Development
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mt-1">
              Our feedback system is being designed to capture actionable insights from every 
              patient interaction, with AI-powered sentiment analysis and automated follow-up workflows.
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
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Avg Satisfaction</span>
          </div>
          <p className="text-2xl font-bold mt-2">4.7/5</p>
          <p className="text-xs text-slate-500">Based on pilot feedback</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Responses/Mo</span>
          </div>
          <p className="text-2xl font-bold mt-2">892</p>
          <p className="text-xs text-slate-500">Feedback collected</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Improvement</span>
          </div>
          <p className="text-2xl font-bold mt-2">+23%</p>
          <p className="text-xs text-slate-500">Score increase YoY</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Want to drive continuous improvement through feedback? Join our early adopter program 
          for priority access to the survey platform.
        </p>
      </div>
    </div>
  );
}
