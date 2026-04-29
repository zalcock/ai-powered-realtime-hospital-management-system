import mongoose from "mongoose";
import { auth } from "../src/lib/auth";
import bcrypt from "bcrypt";

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/hospital";

async function seed() {
  console.log("🌱 Starting database seeding...");
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Get the users collection directly (better-auth stores users here)
    const usersCollection = mongoose.connection.collection("user");

    // Clear existing data (optional - comment out if you want to preserve)
    await usersCollection.deleteMany({});
    console.log("🗑️ Cleared existing users");

    // Create admin user
    const adminId = await createUser(usersCollection, {
      name: "Dr. John Smith",
      email: "admin@medflow.com",
      password: "Admin@123",
      role: "admin",
      department: "Administration",
      gender: "Male",
      bloodgroup: "O+",
      age: "45",
      status: "active",
    });

    // Create doctor
    const doctorId = await createUser(usersCollection, {
      name: "Dr. SarahJohnson",
      email: "doctor@medflow.com",
      password: "Doctor@123",
      role: "doctor",
      department: "Cardiology",
      specialization: "Cardiologist",
      gender: "Female",
      bloodgroup: "A+",
      age: "38",
      status: "active",
    });

    // Create nurse
    const nurseId = await createUser(usersCollection, {
      name: "Emily Davis",
      email: "nurse@medflow.com",
      password: "Nurse@123",
      role: "nurse",
      department: "Emergency",
      gender: "Female",
      bloodgroup: "B+",
      age: "30",
      status: "active",
    });

    // Create patient
    const patientId = await createUser(usersCollection, {
      name: "Michael Wilson",
      email: "patient@medflow.com",
      password: "Patient@123",
      role: "patient",
      department: "General Medicine",
      gender: "Male",
      bloodgroup: "AB+",
      age: "55",
      medicalHistory: "Hypertension, Type 2 Diabetes",
      status: "active",
    });

    // Create pharmacist user
    const pharmacistId = await createUser(usersCollection, {
      name: "Robert Chen",
      email: "pharmacist@medflow.com",
      password: "Pharm@123",
      role: "pharmacist",
      department: "Pharmacy",
      gender: "Male",
      bloodgroup: "O-",
      age: "42",
      status: "active",
    });

    // Create lab technician
    const labTechId = await createUser(usersCollection, {
      name: "Lisa Wong",
      email: "labtech@medflow.com",
      password: "LabTech@123",
      role: "lab_tech",
      department: "Laboratory",
      gender: "Female",
      bloodgroup: "A-",
      age: "35",
      status: "active",
    });

    console.log("\n✅ Seeded users:");
    console.log(`   Admin:    ${adminId} (admin@medflow.com)`);
    console.log(`   Doctor:   ${doctorId} (doctor@medflow.com)`);
    console.log(`   Nurse:    ${nurseId} (nurse@medflow.com)`);
    console.log(`   Patient:  ${patientId} (patient@medflow.com)`);
    console.log(`   Pharmacist: ${pharmacistId} (pharmacist@medflow.com)`);
    console.log(`   Lab Tech: ${labTechId} (labtech@medflow.com)`);
    console.log("\n🔐 Default passwords:");
    console.log("   Admin: Admin@123");
    console.log("   Doctor: Doctor@123");
    console.log("   Nurse: Nurse@123");
    console.log("   Patient: Patient@123");
    console.log("   Pharmacist: Pharm@123");
    console.log("   Lab Tech: LabTech@123");
    console.log("\n🎉 Database seeding complete!");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// Helper function to create user with bcrypt password
async function createUser(
  collection: mongoose.Collection,
  userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    department: string;
    gender?: string;
    bloodgroup?: string;
    age?: string;
    status?: string;
    specialization?: string;
    medicalHistory?: string;
  },
) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const result = await collection.insertOne({
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result.insertedId;
}

// Run seed
seed().catch(console.error);
