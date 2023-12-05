import { fetchTasks } from '../../http';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';

export async function loader() {
  try {
    const tasks = await fetchTasks();
    if (tasks.length === 0) {
      return redirect('/task');
    }
    return { tasks };
  } catch {
    return redirect('/');
  }
}

export const Tasks = () => {
  const { tasks } = useLoaderData();

  return (
    <div className="">
      <div className="text-xl font-medium text-black dark:text-white mb-6">
        Your recurring tasks
      </div>
      {tasks.map((task) => (
        <Link
          to={`/task/${task.id}`}
          className="text-lg text-slate-800"
          key={task.id}
        >
          <div className="p-4 mx-auto mb-4 bg-white dark:bg-gray-200 rounded-md shadow-md flex flex-row items-center">
            <div className="flex flex-1 flex-col">
              <div className="text-lg text-slate-800">{task.name}</div>
              <div className="text-sm text-gray-500">
                {task.history.length > 0
                  ? format(new Date(task.history[0].completed_at), 'Pp')
                  : 'Never completed'}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <Link to="/task" className="absolute bottom-6 right-6">
        <button className="bg-gray-600 rounded-md p-2 text-gray-200">
          New task
        </button>
      </Link>
    </div>
  );
};
