import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGO_URI = process.env.DATABASE_URI as string;

async function seed() {
    if (!MONGO_URI) {
        console.error("❌ DATABASE_URI is not set in .env.local");
        process.exit(1);
    }

    await mongoose.connect(MONGO_URI, { dbName: "portfolio" });
    console.log("✅ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("vipul1234", 10);

    const result = await mongoose.connection.db!.collection("users").insertOne({
        name: "vipul suthar",
        email: "vipulsuthar@gmail.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    console.log("✅ User created with ID:", result.insertedId.toString());
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
