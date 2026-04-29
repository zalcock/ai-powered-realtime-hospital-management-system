import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function createAdminUser() {
  const client = new MongoClient(process.env.MONGO_URI || "");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    
    // Check if user already exists
    const existingUser = await db.collection("user").findOne({ email: "AlcockZN@hospital.com" });
    
    if (existingUser) {
      console.log("User AlcockZN@hospital.com already exists");
      return;
    }
    
    // Hash the password
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.hash("Opel@stra02", 10);
    
    // Create new admin user
    const newUser = {
      email: "AlcockZN@hospital.com",
      password: hashedPassword,
      role: "admin",
      // Add any additional fields that might be required
      name: "Alcock ZN",
      status: "active"
    };
    
    const result = await db.collection("user").insertOne(newUser);
    
    if (result.insertedId) {
      console.log("Admin user created successfully:");
      console.log(`- Email: AlcockZN@hospital.com`);
      console.log(`- Password: Opel@stra02`);
      console.log(`- Role: admin`);
    } else {
      console.log("Failed to create admin user");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

createAdminUser();