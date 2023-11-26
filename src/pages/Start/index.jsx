import { useEffect, useState } from "react";
import { fetchTasks } from "../../http";

export const Start = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  if (!tasks) {
    return null;
  }

  if (tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};
