import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MedFlow" },
    { name: "description", content: "MedFlow Hospital Management" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Welcome to MedFlow
      </h1>
      <p className="max-w-md text-slate-600 dark:text-slate-300">
        Your hospital operations dashboard is ready. Sign in to continue.
      </p>
      <Button asChild>
        <Link to="/login">Go to Login</Link>
      </Button>
    </div>
  );
}
