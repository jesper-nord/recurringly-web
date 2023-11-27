import { fetchTasks } from '../../http';
import { Link, useLoaderData } from 'react-router-dom';

export async function loader() {
  const tasks = await fetchTasks();
  return { tasks };
}

export const Start = () => {
  const { tasks } = useLoaderData();

  if (tasks.length === 0) {
    return (
      <div>
        No tasks found, <Link to="/task">create one</Link>.
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <Link to={`/task/${task.id}`}>{task.name}</Link>
        </div>
      ))}
      <Link to="/task">Create new</Link>
    </div>
  );
};
