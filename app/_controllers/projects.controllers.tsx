const fs = require("fs");
const path = require("path");

const Data_File = fs.existsSync(path.join(process.cwd(), "app/data/projects.json"))
    ? path.join(process.cwd(), "app/data/projects.json")
    : path.join(__dirname, "../data/projects.json");

interface Project {
    id: number;
    name: string;
    taskCount: number;
}

function readData(): Project[] {
    const raw = fs.readFileSync(Data_File, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : (parsed.projects || parsed.applications || []);
}

function writeData(projects: Project[]) {
    fs.writeFileSync(Data_File, JSON.stringify(projects, null, 2));
}

function sendSuccess(res: any, status: number, data: any) {
    res.status(status).json({ success: true, data });
}

function sendError(res: any, status: number, message: string) {
    res.status(status).json({ success: false, message });
}

// Get all projects with optional sort or pagination
exports.getAllProjects = (req: any, res: any) => {
    const { sort, page, limit } = req.query || {};

    let result = readData();

    if (sort === "name") {
        result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "taskCount") {
        result = result.slice().sort((a, b) => b.taskCount - a.taskCount);
    }

    if (page && limit) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const start = (pageNum - 1) * limitNum;
        result = result.slice(start, start + limitNum);
    }

    sendSuccess(res, 200, result);
};

// Alias for backward compatibility
exports.getAllApplications = exports.getAllProjects;

// Get project by ID
exports.getProjectById = (req: any, res: any) => {
    const id = Number(req.params.id);
    const projects = readData();
    const project = projects.find((p) => p.id === id);
    if (!project) {
        return sendError(res, 404, "Project not found");
    }
    sendSuccess(res, 200, project);
};

// Get project stats (total projects & total tasks)
exports.getProjectStats = (req: any, res: any) => {
    const projects = readData();
    const totalProjects = projects.length;
    const totalTasks = projects.reduce((acc, p) => acc + (Number(p.taskCount) || 0), 0);
    const stats = {
        total: totalProjects,
        totalTasks,
    };
    sendSuccess(res, 200, stats);
};

// Create a new project (takes name and taskCount from req.body)
exports.createProject = (req: any, res: any) => {
    const { name, taskCount } = req.body || {};
    if (!name || typeof name !== "string" || name.trim() === "") {
        return sendError(res, 400, "Project name is required");
    }

    const projects = readData();
    const newProject: Project = {
        id: projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
        name: name.trim(),
        taskCount: Number(taskCount) || 0,
    };

    projects.push(newProject);
    writeData(projects);
    sendSuccess(res, 201, newProject);
};

// Update an existing project
exports.updateProject = (req: any, res: any) => {
    const id = Number(req.params.id);
    const projects = readData();
    const project = projects.find((p) => p.id === id);
    if (!project) {
        return sendError(res, 404, "Project not found");
    }

    const { name, taskCount } = req.body || {};
    if (name !== undefined) project.name = name.trim();
    if (taskCount !== undefined) project.taskCount = Number(taskCount) || 0;

    writeData(projects);
    sendSuccess(res, 200, project);
};

// Delete a project
exports.deleteProject = (req: any, res: any) => {
    const id = Number(req.params.id);
    const projects = readData();

    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
        return sendError(res, 404, "Project not found");
    }

    projects.splice(index, 1);
    writeData(projects);
    sendSuccess(res, 200, { message: "Project deleted successfully" });
};