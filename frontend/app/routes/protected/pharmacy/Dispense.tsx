import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { Pill, Truck, FileText, Building2, Calculator, DollarSign, Shield } from "lucide-react";

export function meta() {
  return [{ title: "Pharmacy - Dispense Medications" }];
}

const features = [
  {
    icon: Pill,
    title: "Medication Verification",
    description: "Cross-check prescriptions with patient history and allergies",
    status: "Coming Soon"
  },
  {
    icon: Truck,
    title: "Inventory Tracking",
    description: "Real-time stock levels with automatic reordering",
    status: "Phase 2"
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Secure e-prescribing with pharmacy network integration",
    status: "Phase 2"
  },
  {
    icon: Building2,
    title: "Pharmacy Management",
    description: "Multi-location support with centralized dispensing",
    status: "Phase 3"
  },
];

export default function PharmacyDispense() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Pharmacy..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Pill className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Pharmacy Dispensing</h1>
          <p className="text-slate-500">
            Manage medication dispensing and track inventory in real-time
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">
              Advanced Pharmacy Module - In Development
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Our comprehensive pharmacy management system is being built with HIPAA-compliant 
              dispensing workflows, drug interaction checking, and automated inventory management.
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
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Projected Savings</span>
          </div>
          <p className="text-2xl font-bold mt-2">23%</p>
          <p className="text-xs text-slate-500">Through optimized inventory</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Error Reduction</span>
          </div>
          <p className="text-2xl font-bold mt-2">94%</p>
          <p className="text-xs text-slate-500">Automated verification</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Compliance</span>
          </div>
          <p className="text-2xl font-bold mt-2">HIPAA</p>
          <p className="text-xs text-slate-500">Ready architecture</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Interested in custom pharmacy features? Contact our sales team for early access to beta programs.
        </p>
      </div>
    </div>
  );
}
