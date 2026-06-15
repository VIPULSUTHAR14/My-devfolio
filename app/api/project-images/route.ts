import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Public: list all project image files in public/Project_Images/
export async function GET() {
    try {
        const projectImagesDir = path.join(process.cwd(), "public", "Project_Images");

        // Ensure directory exists
        if (!fs.existsSync(projectImagesDir)) {
            fs.mkdirSync(projectImagesDir, { recursive: true });
        }

        const files = fs.readdirSync(projectImagesDir);

        // Filter to only image files
        const imageExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"];
        const projectImages = files
            .filter((file) =>
                imageExtensions.includes(path.extname(file).toLowerCase())
            )
            .map((file) => ({
                name: path.parse(file).name,
                path: `Project_Images/${file}`,
            }));

        return NextResponse.json(projectImages, { status: 200 });
    } catch (error) {
        console.error("Failed to read project images:", error);
        return NextResponse.json(
            { error: "Failed to read project images" },
            { status: 500 }
        );
    }
}
