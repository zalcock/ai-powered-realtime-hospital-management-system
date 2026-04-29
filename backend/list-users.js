import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function listUsers() {
  const client = new MongoClient(process.env.MONGO_URI || "");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    const users = await db.collection("user").find({}).toArray();
    
    console.log("Users in database:");
    users.forEach(user => {
      console.log(`- Email: ${user.email || 'N/A'}, ID: ${user._id}, Role: ${user.role || 'N/A'}`);
    });
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

listUsers();