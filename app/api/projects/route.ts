import { NextResponse } from "next/server";
import { Database } from "@/lib/database";
import Project from "@/lib/models/Project";
import { auth } from "@/lib/auth";
import "@/lib/models/Skill"; // Ensure Skill schema is registered for populate

// Public: fetch all projects
export async function GET() {
    try {
        await Database();
        const projects = await Project.find()
            .populate("Tech_stack")
            .sort({ Project_number: 1 });
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

// Protected: create a new project
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

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
        const project = await Project.create({
            Project_number,
            project_name,
            Project_status,
            Project_type,
            project_description,
            Tech_stack: Tech_stack || [],
            img1,
            link_To_Live: link_To_Live || "",
            Link_To_Repo: Link_To_Repo || "",
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Failed to create project:", error);
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}
