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

// Protected: update a skill by ID
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
        const { name, image, skill_number } = await request.json();

        if (!name || !image || skill_number === undefined || skill_number === null) {
            return NextResponse.json(
                { error: "Name, image, and skill number are required" },
                { status: 400 }
            );
        }

        await Database();
        const updated = await Skill.findByIdAndUpdate(
            id,
            { name, image, skill_number: Number(skill_number) },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json(
                { error: "Skill not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("Failed to update skill:", error);
        return NextResponse.json(
            { error: "Failed to update skill" },
            { status: 500 }
        );
    }
}
