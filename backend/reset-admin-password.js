import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function resetAdminPassword() {
  const client = new MongoClient(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hospital");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    
    // Find the admin user
    const adminUser = await db.collection("user").findOne({
      $or: [
        { email: "marcusai@gmail.com" },
        { name: "marcusai" }
      ]
    });
    
    if (!adminUser) {
      console.log("Admin user not found");
      return;
    }
    
    console.log("Found admin user:", adminUser.email || adminUser.name);
    
    // Hash the new password
    const bcrypt = await import("bcrypt");
    const newPassword = "Opel@stra02";
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user collection
    const result = await db.collection("user").updateOne(
      { _id: adminUser._id },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );

    // Update account collection if exists
    await db.collection("account").updateOne(
      { 
        $or: [
          { userId: adminUser._id },
          { userId: adminUser._id.toString() },
          { accountId: adminUser._id.toString() }
        ]
      },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );
    
    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      console.log(`Password updated successfully for ${adminUser.email || adminUser.name}`);
      console.log(`New password: ${newPassword}`);
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