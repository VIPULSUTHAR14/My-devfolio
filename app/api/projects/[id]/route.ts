import { NextResponse } from "next/server";
import { Database } from "@/lib/database";
import Project from "@/lib/models/Project";
import { auth } from "@/lib/auth";

// Protected: delete a project by ID
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
        const deleted = await Project.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Project deleted" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to delete project:", error);
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        );
    }
}
