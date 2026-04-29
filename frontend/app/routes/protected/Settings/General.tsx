import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { Palette, Bell, Moon, Sun, Globe, Shield, Sliders, Laptop } from "lucide-react";

export function meta() {
  return [{ title: "Settings - General Configuration" }];
}

const features = [
  {
    icon: Palette,
    title: "Theme Customization",
    description: "Personalize your workspace with custom color schemes and brand colors",
    status: "Coming Soon"
  },
  {
    icon: Bell,
    title: "Notification Center",
    description: "Configure alerts, email digests, and mobile push notifications by event type",
    status: "Coming Soon"
  },
  {
    icon: Globe,
    title: "Localization",
    description: "Multi-language support with timezone and date format preferences",
    status: "Phase 2"
  },
  {
    icon: Shield,
    title: "Security Preferences",
    description: "MFA setup, session timeout, and login attempt policies",
    status: "Phase 2"
  },
];

export default function SettingsGeneral() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Settings..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Sliders className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">General Settings</h1>
          <p className="text-slate-500">
            Configure display preferences, notifications, and workspace defaults
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
            <Laptop className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Workspace Configuration - In Development
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mt-1">
              The general settings panel is being built to give you full control over your 
              workspace experience, from visual themes to how you receive critical alerts.
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
            <Sun className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Theme Options</span>
          </div>
          <p className="text-2xl font-bold mt-2">5</p>
          <p className="text-xs text-slate-500">Light, dark & custom themes</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-fuchsia-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Notification Types</span>
          </div>
          <p className="text-2xl font-bold mt-2">18</p>
          <p className="text-xs text-slate-500">Configurable event alerts</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Languages</span>
          </div>
          <p className="text-2xl font-bold mt-2">8</p>
          <p className="text-xs text-slate-500">Localization ready</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Have ideas for workspace improvements? Share them with our product team 
          through the feedback portal.
        </p>
      </div>
    </div>
  );
}
