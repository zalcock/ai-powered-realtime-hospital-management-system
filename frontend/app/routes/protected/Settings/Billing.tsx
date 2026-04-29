import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { CreditCard, Receipt, DollarSign, Calculator, FileText, Shield, PieChart, TrendingUp } from "lucide-react";

export function meta() {
  return [{ title: "Settings - Billing Configuration" }];
}

const features = [
  {
    icon: CreditCard,
    title: "Payment Gateway",
    description: "Integrate multiple payment processors with PCI-DSS compliant transaction handling",
    status: "Coming Soon"
  },
  {
    icon: Receipt,
    title: "Invoice Management",
    description: "Automated billing cycles, recurring invoices, and custom billing schedules",
    status: "Coming Soon"
  },
  {
    icon: Calculator,
    title: "Pricing Models",
    description: "Flexible subscription tiers, usage-based billing, and insurance billing codes",
    status: "Phase 2"
  },
  {
    icon: FileText,
    title: "Claims Processing",
    description: "Automated insurance claim submission and EOB reconciliation",
    status: "Phase 3"
  },
];

export default function SettingsBilling() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Billing Settings..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <DollarSign className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Billing Configuration</h1>
          <p className="text-slate-500">
            Configure payment processing, invoicing, and financial settings
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
            <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100">
              Financial Infrastructure - In Development
            </h3>
            <p className="text-emerald-700 dark:text-emerald-300 mt-1">
              Our billing system is being architected with PCI-DSS compliance, automated tax 
              calculations, and seamless integration with major payment gateways and insurance systems.
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
            <PieChart className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Revenue Streams</span>
          </div>
          <p className="text-2xl font-bold mt-2">5</p>
          <p className="text-xs text-slate-500">Billing models supported</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Payment Methods</span>
          </div>
          <p className="text-2xl font-bold mt-2">12+</p>
          <p className="text-xs text-slate-500">Processors integrated</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">PCI Compliance</span>
          </div>
          <p className="text-2xl font-bold mt-2">Level 1</p>
          <p className="text-xs text-slate-500">Security standard</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 text-center">
          Need custom billing solutions for your healthcare facility? Schedule a consultation with 
          our finance technology team.
        </p>
      </div>
    </div>
  );
}
