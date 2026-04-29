import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function resetAdminPassword() {
  const client = new MongoClient(process.env.MONGO_URI || "");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    
    // Find the admin user
    const adminUser = await db.collection("user").findOne({ email: "marcusai@gmail.com" });
    
    if (!adminUser) {
      console.log("Admin user not found");
      return;
    }
    
    console.log("Found admin user:", adminUser.email);
    
    // Hash the new password
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.hash("newpassword123", 10);
    
    // Update the user's password
    const result = await db.collection("user").updateOne(
      { _id: adminUser._id },
      { $set: { password: hashedPassword } }
    );
    
    if (result.modifiedCount > 0) {
      console.log("Password updated successfully for marcusai@gmail.com");
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

resetAdminPassword();