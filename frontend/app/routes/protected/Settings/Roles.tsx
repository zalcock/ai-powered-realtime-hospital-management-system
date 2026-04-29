import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { Shield, Users, Key, Lock, UserPlus, Settings, CheckCircle, AlertTriangle } from "lucide-react";

export function meta() {
  return [{ title: "Settings - Roles & Permissions" }];
}

const features = [
  {
    icon: Shield,
    title: "Role Management",
    description: "Create custom roles with granular permissions for different departments",
    status: "Coming Soon"
  },
  {
    icon: Key,
    title: "Permission Matrix",
    description: "Fine-grained access control for modules, records, and actions",
    status: "Coming Soon"
  },
  {
    icon: UserPlus,
    title: "User Provisioning",
    description: "Automated onboarding workflows with role assignment templates",
    status: "Phase 2"
  },
  {
    icon: AlertTriangle,
    title: "Audit Logging",
    description: "Track all permission changes and access violations for compliance",
    status: "Phase 2"
  },
];

export default function SettingsRoles() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Roles & Permissions..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Roles & Permissions</h1>
          <p className="text-slate-500">
            Manage access control and define user roles across the organization
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
            <Lock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100">
              Access Control System - In Development
            </h3>
            <p className="text-orange-700 dark:text-orange-300 mt-1">
              Enterprise-grade RBAC and ABAC systems are under construction to ensure HIPAA compliance 
              with role-based access to PHI, detailed audit trails, and automated permission reviews.
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
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Role Definitions</span>
          </div>
          <p className="text-2xl font-bold mt-2">7</p>
          <p className="text-xs text-slate-500">Core roles configured</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Permission Sets</span>
          </div>
          <p className="text-2xl font-bold mt-2">24</p>
          <p className="text-xs text-slate-500">Granular access controls</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Compliance</span>
          </div>
          <p className="text-2xl font-bold mt-2">HIPAA</p>
          <p className="text-xs text-slate-500">Access control ready</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Implementing enterprise-grade access controls? Contact our security team for 
          compliance consultation and implementation guidance.
        </p>
      </div>
    </div>
  );
}
