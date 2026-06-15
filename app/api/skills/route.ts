import { NextResponse } from "next/server";
import { Database } from "@/lib/database";
import Skill from "@/lib/models/Skill";
import { auth } from "@/lib/auth";

// Public: fetch all skills
export async function GET() {
    try {
        await Database();
        const skills = await Skill.find().sort({ createdAt: -1 });
        return NextResponse.json(skills, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch skills:", error);
        return NextResponse.json(
            { error: "Failed to fetch skills" },
            { status: 500 }
        );
    }
}

// Protected: create a new skill
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { name, image } = await request.json();

        if (!name || !image) {
            return NextResponse.json(
                { error: "Name and image are required" },
                { status: 400 }
            );
        }

        await Database();
        const skill = await Skill.create({ name, image });

        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        console.error("Failed to create skill:", error);
        return NextResponse.json(
            { error: "Failed to create skill" },
            { status: 500 }
        );
    }
}
