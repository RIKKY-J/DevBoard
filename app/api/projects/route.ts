import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "app", "data", "projects.json");

interface Project {
  id: number;
  name: string;
  taskCount: number;
}

function readProjects(): Project[] {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProjects(projects: Project[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2));
}

// GET /api/projects - Retrieve all projects
export async function GET() {
  const projects = readProjects();
  return NextResponse.json({ success: true, data: projects });
}

// POST /api/projects - Create a new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, taskCount } = body || {};

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Project name is required" },
        { status: 400 }
      );
    }

    const projects = readProjects();
    const newProject: Project = {
      id: projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
      name: name.trim(),
      taskCount: Number(taskCount) || 0,
    };

    projects.push(newProject);
    writeProjects(projects);

    return NextResponse.json(
      { success: true, data: newProject, message: "Project added successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
