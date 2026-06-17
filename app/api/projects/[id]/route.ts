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

// Protected: update a project by ID
export async function PUT(
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
        const {
            Project_number,
            project_name,
            Project_status,
            Project_type,
            project_description,
            Tech_stack,
            img1,
            link_To_Live,
            Link_To_Repo,
        } = await request.json();

        if (
            !Project_number ||
            !project_name ||
            !Project_status ||
            !Project_type ||
            !project_description ||
            !img1
        ) {
            return NextResponse.json(
                { error: "Required fields are missing" },
                { status: 400 }
            );
        }

        await Database();
        const updated = await Project.findByIdAndUpdate(
            id,
            {
                Project_number,
                project_name,
                Project_status,
                Project_type,
                project_description,
                Tech_stack: Tech_stack || [],
                img1,
                link_To_Live: link_To_Live || "",
                Link_To_Repo: Link_To_Repo || "",
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("Failed to update project:", error);
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 }
        );
    }
}
