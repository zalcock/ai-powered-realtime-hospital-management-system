import Loader from "@/components/global/Loader";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { AlertTriangle, ArrowLeft, Home, Search, FileText, Stethoscope, Shield } from "lucide-react";

export function meta() {
  return [{ title: "Page Not Found" }];
}

export default function NotFound() {
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
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 404 Graphic */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30 rounded-3xl border border-slate-200 dark:border-slate-800">
              <AlertTriangle className="w-24 h-24 text-primary/60" />
            </div>
          </div>
          <h1 className="mt-6 text-7xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mt-2">
            Page Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="card p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-center gap-3 group"
          >
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:scale-110 transition-transform">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Go Back</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Return to previous page</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/')}
            className="card p-5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-center gap-3 group"
          >
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Home</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Go to dashboard</p>
            </div>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="card border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-center mb-4">
            Popular Destinations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
            >
              <Home className="w-5 h-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/app/patients')}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
            >
              <Users className="w-5 h-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Patients</span>
            </button>
            <button
              onClick={() => navigate('/app/staff')}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
            >
              <Stethoscope className="w-5 h-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Staff</span>
            </button>
            <button
              onClick={() => navigate('/app/settings/general')}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
            >
              <Shield className="w-5 h-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-slate-600 dark:text-slate-400">Settings</span>
            </button>
          </div>
        </div>

        {/* Status Info */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            If you believe this is an error, please contact{" "}
            <a href="mailto:support@hospital-mgmt.com" className="text-primary hover:underline">
              support@hospital-mgmt.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
