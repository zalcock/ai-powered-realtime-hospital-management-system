import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { Truck, Boxes, BarChart3, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export function meta() {
  return [{ title: "Pharmacy - Inventory Management" }];
}

const features = [
  {
    icon: Boxes,
    title: "Real-Time Stock Tracking",
    description: "Monitor inventory levels across multiple locations in real-time",
    details: ["Automatic stock alerts", "Batch & expiry tracking", "Supplier management"]
  },
  {
    icon: Truck,
    title: "Smart Reordering",
    description: "AI-powered reorder point calculations and purchase order generation",
    details: ["Vendor comparison", "Lead time tracking", "Cost optimization"]
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive reports on medication usage and waste",
    details: ["Usage patterns", "Popular medications", "Expiry forecasts"]
  },
  {
    icon: Clock,
    title: "Historical Auditing",
    description: "Complete audit trail for regulatory compliance",
    details: ["Track all changes", "Compliance reports", "Chain of custody"]
  },
];

export default function PharmacyInventory() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading Inventory..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Truck className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Inventory Management</h1>
          <p className="text-slate-500">
            Track medications, manage stock levels, and automate reordering
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100">
              Inventory Module - Coming Soon
            </h3>
            <p className="text-amber-700 dark:text-amber-300 mt-1">
              Advanced inventory management with automatic reordering, expiry tracking, and 
              integration with dispensing workflows. Stay tuned for release in Q3 2026.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Boxes className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Total SKUs</span>
          </div>
          <p className="text-2xl font-bold">2,400+</p>
          <p className="text-xs text-slate-500">Medication items</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium">Expiring Soon</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">47</p>
          <p className="text-xs text-slate-500">Within 30 days</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">In Stock</span>
          </div>
          <p className="text-2xl font-bold text-green-600">98.2%</p>
          <p className="text-xs text-slate-500">Availability rate</p>
        </div>
        <div className="card p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">Monthly Savings</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">$12.5K</p>
          <p className="text-xs text-slate-500">Optimization potential</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="card p-6 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
