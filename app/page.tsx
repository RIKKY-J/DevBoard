"use client";

import { useState } from "react";
import Card from "./_components/ProjectCard";
import projects from "./data/projects.json";

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">DevBoard</a>
        </div>
      </nav>
    </header>
  );
}

export default function Home() {
  const [startedProjects, setStartedProjects] = useState<number[]>([]);

  const totalProjects = projects.length;
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

      <h1>Welcome</h1>
      <h2>Projects</h2>

      <h3>
        {totalProjects} projects · {inProgressProjects} in progress
      </h3>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {projects.map((project) => (
          <Card
            key={project.id}
            name={project.name}
            taskCount={project.taskCount}
            isStarted={startedProjects.includes(project.id)}
            onToggle={() => toggleProject(project.id)}
          />
        ))}
      </div>
    </>
  );
}