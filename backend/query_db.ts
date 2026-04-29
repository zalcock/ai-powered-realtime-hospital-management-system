import { MongoClient } from "mongodb";

async function run() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hospital";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    
    const users = await db.collection("user").find({}).toArray();
    console.log("Users:", users.map(u => ({ id: u.id, email: u.email, name: u.name })));
    
    const accounts = await db.collection("account").find({}).toArray();
    console.log("Accounts:", accounts);
    
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
