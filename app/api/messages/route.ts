import { NextResponse } from "next/server";
import { Database } from "@/lib/database";
import Message from "@/lib/models/Message";
import { auth } from "@/lib/auth";

// Protected: fetch all messages (sorted by newest first)
export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await Database();
        const messages = await Message.find().sort({ createdAt: -1 });
        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}

// Public: submit a new contact message
export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        await Database();
        const newMessage = await Message.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error("Failed to submit message:", error);
        return NextResponse.json(
            { error: "Failed to submit message" },
            { status: 500 }
        );
    }
}
