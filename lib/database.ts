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

    return cached.conn;
}