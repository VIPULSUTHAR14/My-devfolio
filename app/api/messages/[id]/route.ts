import { NextResponse } from "next/server";
import { Database } from "@/lib/database";
import Message from "@/lib/models/Message";
import { auth } from "@/lib/auth";

// Protected: delete a contact message by ID
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        await Database();
        const deleted = await Message.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Message deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to delete message:", error);
        return NextResponse.json(
            { error: "Failed to delete message" },
            { status: 500 }
        );
    }
}
