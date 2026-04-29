import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/Login.tsx"),
  // Protected routes with sidebar layout
  layout("routes/protected/layout.tsx", [
    route("dashboard", "routes/protected/Dashboard.tsx"),
    route("admins", "routes/protected/Admins.tsx"),
    route("doctors", "routes/protected/Doctors.tsx"),
    route("nurses", "routes/protected/Nurses.tsx"),
    route("patients", "routes/protected/Patients.tsx"),
    route("activities-log", "routes/protected/ActivitiesLog.tsx"),
    route("profile/:id", "routes/protected/Profile.tsx"),
    route("financial-history", "routes/protected/FinancialHistory.tsx"),
    // Pharmacy routes
    route("pharmacy/dispense", "routes/protected/pharmacy/Dispense.tsx"),
    route("pharmacy/inventory", "routes/protected/pharmacy/Inventory.tsx"),
    route("pharmacy/prescriptions", "routes/protected/pharmacy/Prescriptions.tsx"),
    // Laboratory routes
    route("lab/requests", "routes/protected/lab/TestRequests.tsx"),
    route("lab/results", "routes/protected/lab/ResultsEntry.tsx"),
    // Appointments
    route("appointments", "routes/protected/Appointments.tsx"),
    route("telemedicine", "routes/protected/Telemedicine.tsx"),
    // Settings
    route("settings", "routes/protected/Settings/General.tsx"),
    route("settings/roles", "routes/protected/Settings/Roles.tsx"),
    route("settings/billing", "routes/protected/Settings/Billing.tsx"),
    // Support & Feedback
    route("support", "routes/protected/Support.tsx"),
    route("feedback", "routes/protected/Feedback.tsx"),
  ]),
  // 404 page
  route("not-found", "routes/NotFound.tsx"),
] satisfies RouteConfig;
