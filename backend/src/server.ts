import dotenv from "dotenv";
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
