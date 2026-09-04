import dotenv from "dotenv";
import mongoose from "mongoose";
import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { serve } from "inngest/express";
import { createServer } from "http";

import { connectDB } from "./config/db";
import { auth } from "./lib/auth";
import userRouter from "./routes/user";
import activityLogRouter from "./routes/activity";
import { inngest } from "./inngest/client";
import {
  admitPatient,
  analyzeXRayJob,
  addChargeToInvoice,
} from "./inngest/functions";
import notificationRouter from "./routes/notification";
import labResultsRouter from "./routes/labResults";
import invoiceRouter from "./routes/invoice";
import { getIO, initSocket } from "./lib/socket";
import { uploadRouter } from "./lib/uploadthing";
import { createRouteHandler } from "uploadthing/express";
import uploadthingRouter from "./routes/uploadthing";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app: Application = express();
export { app };
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

initSocket(httpServer);

// Make 'io' accessible in Express req.app.get("io") for backwards compatibility
app.set("io", getIO());

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Configure Helmet to allow cross-origin resource sharing
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// Use cookie parser middleware to parse cookies in incoming requests
app.use(cookieParser());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (only in development mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Basic route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});
app.use("/api/users", userRouter);
app.use("/api/activity-logs", activityLogRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/lab-results", labResultsRouter);
app.use("/api/invoices", invoiceRouter);
// inngest API route
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [admitPatient, analyzeXRayJob, addChargeToInvoice],
  }),
);
app.use("/api/uploadthing", createRouteHandler({ router: uploadRouter }));
app.use("/api/uploadthing/delete", uploadthingRouter);

// TEMPORARY one-time seed endpoint, guarded by a secret token.
// Remove this route after seeding the database once.
app.get("/api/dev/seed", async (req: Request, res: Response) => {
  if (!process.env.SEED_TOKEN || req.query.token !== process.env.SEED_TOKEN) {
    return res.status(403).json({ success: false, message: "forbidden" });
  }
  const SEED_USERS = [
    { name: "Dr. John Smith", email: "admin@medflow.com", password: "Admin@123", role: "admin", department: "Administration", gender: "Male", bloodgroup: "O+", age: "45", status: "active" },
    { name: "Dr. SarahJohnson", email: "doctor@medflow.com", password: "Doctor@123", role: "doctor", department: "Cardiology", specialization: "Cardiologist", gender: "Female", bloodgroup: "A+", age: "38", status: "active" },
    { name: "Emily Davis", email: "nurse@medflow.com", password: "Nurse@123", role: "nurse", department: "Emergency", gender: "Female", bloodgroup: "B+", age: "30", status: "active" },
    { name: "Michael Wilson", email: "patient@medflow.com", password: "Patient@123", role: "patient", department: "General Medicine", gender: "Male", bloodgroup: "AB+", age: "55", medicalHistory: "Hypertension, Type 2 Diabetes", status: "active" },
    { name: "Robert Chen", email: "pharmacist@medflow.com", password: "Pharm@123", role: "pharmacist", department: "Pharmacy", gender: "Male", bloodgroup: "O-", age: "42", status: "active" },
    { name: "Lisa Wong", email: "labtech@medflow.com", password: "LabTech@123", role: "lab_tech", department: "Laboratory", gender: "Female", bloodgroup: "A-", age: "35", status: "active" },
  ];
  const results: any[] = [];
  try {
    const usersCollection = mongoose.connection.collection("user");
    const accountsCollection = mongoose.connection.collection("account");
    await usersCollection.deleteMany({});
    await accountsCollection.deleteMany({});
    for (const u of SEED_USERS) {
      try {
        const { email, password, name, ...extra } = u;
        const signUpResult: any = await auth.api.signUpEmail({ body: { email, password, name } });
        if (!signUpResult?.user?.id) {
          results.push({ email, ok: false, error: "no user id returned" });
          continue;
        }
        await usersCollection.updateOne({ email }, { $set: { ...extra, updatedAt: new Date() } });
        results.push({ email, role: u.role, ok: true });
      } catch (err: any) {
        results.push({ email: u.email, ok: false, error: err?.message || String(err) });
      }
    }
    return res.json({ success: true, results });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || String(err) });
  }
});

// 404 handler for unmatched routes (must be after all routes)
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// --- Global Error Handler ---
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

// Start the server
connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Server + Socket.IO running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      );
    });
  })
  .catch((error) => {
    console.error(
      `❌ Failed to connect to the database: ${(error as Error).message}`,
    );
    process.exit(1);
  });
