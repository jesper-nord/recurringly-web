import { fetchTasks } from '../../http';
import { Link, useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';

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
    <div className="p-6 bg-slate-100 w-screen h-screen">
      <div className="text-xl font-medium text-black mb-6">Recurring tasks</div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 mx-auto mb-4 bg-white rounded-md shadow-md flex flex-row items-center"
        >
          <div className="flex flex-1 flex-col">
            <Link to={`/task/${task.id}`} className="text-lg text-slate-800">
              {task.name}
            </Link>
            <div className="text-sm text-gray-500">
              {task.history.length > 0
                ? format(new Date(task.history[0].completed_at), 'Pp')
                : 'Never completed'}
            </div>
          </div>
        </div>
      ))}
      <Link
        to="/task"
        className="absolute bottom-6 right-6 bg-gray-600 rounded-md p-2 text-gray-200"
      >
        <button className="button">New task</button>
      </Link>
    </div>
  );
};
