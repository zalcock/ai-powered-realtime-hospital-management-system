import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { AlertTriangle, Hospital, Shield, ArrowLeft, Home } from "lucide-react";

export function meta() {
  return [{ title: "Page Not Found - Hospital Management" }];
}

export default function RootNotFound() {
  const { isPending } = authClient.useSession();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader label="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-3xl w-full">
        <div className="card rounded-3xl p-8 md:p-12 shadow-2xl border-0 bg-white dark:bg-slate-900">
          <div className="text-center mb-10">
            {/* Icon Circle */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200 dark:border-red-900 mb-6">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>

            {/* Main Text */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-slate-100 mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              Page Not Found
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-lg">
              This page doesn't exist in our hospital management system. Let's get you back to safety.
            </p>
          </div>

          {/* Error Description Card */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-8">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider">
                  What happened?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  The page you requested may have been removed, renamed, or is temporarily unavailable.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="group relative overflow-hidden rounded-xl p-5 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:scale-110 transition-transform">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">Home</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Return to homepage</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="group relative overflow-hidden rounded-xl p-5 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:scale-110 transition-transform">
                  <ArrowLeft className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">Go Back</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Previous page</p>
                </div>
              </div>
            </button>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Hospital className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-100">System Operational</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">All systems functioning normally</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">99.9%</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">Support</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">HIPAA</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">Compliant</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Need assistance? Contact our support team at{" "}
              <a href="mailto:support@hospital-mgmt.com" className="text-primary hover:underline font-medium">
                support@hospital-mgmt.com
              </a>
              {" or call "}
              <span className="font-medium">1-800-HOSPITAL</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
