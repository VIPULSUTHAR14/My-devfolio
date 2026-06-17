import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.DATABASE_URI as string;
if (!MONGO_URI) {
    throw new Error("Please Add MongoURI");
}

interface MongooseCache {
    conn: Mongoose | null,
    promise: Promise<Mongoose> | null
}

declare global {
    var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || {
    conn: null,
    promise: null
}

global.mongoose = cached;

export async function Database(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            dbName: "portfolio"
        });
    }

    cached.conn = await cached.promise;

    // Migrate skills that don't have skill_number
    try {
        const SkillModel = (await import("./models/Skill")).default;
        const skillsWithoutNumber = await SkillModel.find({
            $or: [
                { skill_number: { $exists: false } },
                { skill_number: null }
            ]
        }).sort({ createdAt: 1 });

        if (skillsWithoutNumber.length > 0) {
            const maxSkill = await SkillModel.findOne({ skill_number: { $exists: true, $ne: null } })
                .sort({ skill_number: -1 })
                .lean();
            let currentMax = maxSkill && typeof maxSkill.skill_number === "number" ? maxSkill.skill_number : 0;

            for (const skill of skillsWithoutNumber) {
                currentMax += 1;
                skill.skill_number = currentMax;
                await skill.save();
            }
        }
    } catch (migrationError) {
        console.error("Migration failed:", migrationError);
    }

    return cached.conn;
}