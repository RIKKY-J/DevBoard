interface CardProps {
  name: string;
  taskCount: number;
  isStarted: boolean;
  onToggle: () => void;
}

export default function Card({
  name,
  taskCount,
  isStarted,
  onToggle,
}: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{name}</h3>

      <p className="card-desc">
        {taskCount} tasks
      </p>

      <p className="card-desc">
        Status: {isStarted ? "In progress" : "Not started"}
      </p>

      <button className="button" onClick={onToggle}>
        {isStarted ? "Reset" : "Start Project"}
      </button>
    </div>
  );
}