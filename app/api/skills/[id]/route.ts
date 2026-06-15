import { NextResponse } from "next/server";
import { Database } from "@/lib/database";
import Skill from "@/lib/models/Skill";
import { auth } from "@/lib/auth";

// Protected: delete a skill by ID
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
        const deleted = await Skill.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Skill not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Skill deleted" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to delete skill:", error);
        return NextResponse.json(
            { error: "Failed to delete skill" },
            { status: 500 }
        );
    }
}
