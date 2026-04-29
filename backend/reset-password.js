import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || "");
const db = client.db();

const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
  emailAndPassword: { enabled: true },
});

async function resetPassword() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    // Find the admin user
    const adminUser = await db.collection("user").findOne({ email: "admin@hospital.com" });
    
    if (!adminUser) {
      console.log("Admin user not found");
      return;
    }
    
    console.log("Found admin user:", adminUser.email);
    
    // Update password using better-auth's updateUser method
    // We need to hash the password first
    const { hashPassword } = await import("better-auth/utils");
    const hashedPassword = await hashPassword("newpassword123");
    
    // Update the user's password
    const result = await db.collection("user").updateOne(
      { _id: adminUser._id },
      { $set: { password: hashedPassword } }
    );
    
    if (result.modifiedCount > 0) {
      console.log("Password updated successfully for admin@hospital.com");
      console.log("New password: newpassword123");
    } else {
      console.log("Failed to update password");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

resetPassword();