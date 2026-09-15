"use client"
import Card from "./_components/ProjectCard";
import projects from "./data/projects.json";


function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        {/* Brand / Logo */}
        <div className="navbar-logo">
          <a href="/">DevBoard</a>
        </div>

      </nav>
    </header>
  );
}



export default function Home() {
  return (
    <>
      <Navbar/>
      <h1>Welcome</h1>
      <h2>Projects</h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {projects.map((project) => (
          <Card 
            name={project.name} 
            taskCount={project.taskCount} 
          />
        ))}
      </div>
    </>
  );
}
