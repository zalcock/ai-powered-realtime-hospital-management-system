import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function resetTestPassword() {
  const client = new MongoClient(process.env.MONGO_URI || "");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    
    // Find the test user
    const testUser = await db.collection("user").findOne({ email: "test@hospital.com" });
    
    if (!testUser) {
      console.log("Test user not found");
      return;
    }
    
    console.log("Found test user:", testUser.email);
    
    // Hash the new password
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.hash("testpassword123", 10);
    
    // Update the user's password
    const result = await db.collection("user").updateOne(
      { _id: testUser._id },
      { $set: { password: hashedPassword } }
    );
    
    if (result.modifiedCount > 0) {
      console.log("Password updated successfully for test@hospital.com");
      console.log("New password: testpassword123");
    } else {
      console.log("Failed to update password");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

resetTestPassword();