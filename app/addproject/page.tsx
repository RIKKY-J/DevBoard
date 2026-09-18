"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link href="/">DevBoard</Link>
        </div>
        <div className="nav-actions">
          <Link href="/" className="btn-secondary">
            ← Back to Projects
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function AddProject() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [taskCount, setTaskCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setIsError(true);
      setMessage("Please enter a project name.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          taskCount: Number(taskCount) || 0,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add project");
      }

      setIsError(false);
      setMessage(`Project "${data.data.name}" added successfully!`);
      setName("");
      setTaskCount("");

      router.refresh();
    } catch (err: any) {
      setIsError(true);
      setMessage(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem 1.5rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Add project details below</h1>
        <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
          Fill in the details below to add a new project to your DevBoard.
        </p>

        <div className="card" style={{ width: "100%", maxWidth: "450px" }}>
          <h2 className="card-title">Project</h2>

          {message && (
            <div className={isError ? "alert-error" : "alert-success"}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="projectName" style={{ fontWeight: 600, fontSize: "14px", display: "block", marginBottom: "4px" }}>
              Enter Name
            </label>
            <input
              id="projectName"
              type="text"
              className="form-input"
              placeholder="name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />

            <label htmlFor="taskCount" style={{ fontWeight: 600, fontSize: "14px", display: "block", marginBottom: "4px" }}>
              Total task
            </label>
            <input
              id="taskCount"
              type="number"
              min="0"
              className="form-input"
              placeholder="taskcount..."
              value={taskCount}
              onChange={(e) => setTaskCount(e.target.value)}
              disabled={loading}
            />

            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px" }}>
              <button
                type="submit"
                className="button"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Adding..." : "Submit"}
              </button>
              <Link
                href="/"
                style={{
                  color: "#64748b",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}