import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Public: list all logo files in public/Logo/
export async function GET() {
    try {
        const logoDir = path.join(process.cwd(), "public", "Logo");
        const files = fs.readdirSync(logoDir);

        // Filter to only image files
        const imageExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"];
        const logos = files
            .filter((file) =>
                imageExtensions.includes(path.extname(file).toLowerCase())
            )
            .map((file) => ({
                name: path.parse(file).name,
                path: `Logo/${file}`,
            }));

        return NextResponse.json(logos, { status: 200 });
    } catch (error) {
        console.error("Failed to read logos:", error);
        return NextResponse.json(
            { error: "Failed to read logos" },
            { status: 500 }
        );
    }
}
