import { useState } from "react";

interface CardProps {
  name: string;
  taskCount: number;
}

export default function Card({ name, taskCount }: CardProps) {
  const [isStarted, setIsStarted] = useState(false);

  const toggleStatus = () => {
    setIsStarted(!isStarted);
  };

  return (
    <div className="card">
      <h3 className="card-title">{name}</h3>
      <p className="card-desc">{taskCount} task</p>
      <p className="card-desc">
        Status: {isStarted ? "In progress" : "Not started"}
      </p>
      <button className="button" onClick={toggleStatus}>
        {isStarted ? "Reset" : "Start Project"}
      </button>
    </div>
  );
}