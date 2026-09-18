"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "./_components/ProjectCard";
import initialProjects from "./data/projects.json";

interface Project {
  id: number;
  name: string;
  taskCount: number;
}

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link href="/">DevBoard</Link>
        </div>
        <div className="nav-actions">
          <Link href="/addproject" className="btn-primary">
            + Add Project
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function Home() {
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [startedProjects, setStartedProjects] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProjectList(data.data);
        }
      })
      .catch(() => {
        // Fallback to initialProjects
      });
  }, []);

  const totalProjects = projectList.length;
  const inProgressProjects = startedProjects.length;

  const toggleProject = (projectId: number) => {
    setStartedProjects((previous) => {
      if (previous.includes(projectId)) {
        return previous.filter((id) => id !== projectId);
      }
      return [...previous, projectId];
    });
  };

  return (
    <>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem" }}>
        <h1>Welcome</h1>
        <h2>Projects</h2>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0 }}>
            {totalProjects} projects · {inProgressProjects} in progress
          </h3>
          <Link href="/addproject" className="btn-primary" style={{ display: "inline-block" }}>
            + Add Project
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {projectList.map((project) => (
            <Card
              key={project.id}
              name={project.name}
              taskCount={project.taskCount}
              isStarted={startedProjects.includes(project.id)}
              onToggle={() => toggleProject(project.id)}
            />
          ))}
        </div>
      </main>
      <footer> This site is developed by Rikky J</footer>
    </>
  );
}