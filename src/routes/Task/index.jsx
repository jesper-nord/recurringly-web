import { fetchTask } from '../../http';
import { Form, Link, redirect, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  try {
    const task = await fetchTask(params.taskId);
    return { task };
  } catch {
    return redirect('/');
  }
}

export const Task = () => {
  const { task } = useLoaderData();

  if (!task) {
    return redirect('/tasks');
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="text-xl font-medium text-black dark:text-white">
          <Link
            to="/tasks"
            className="mr-4 hover:text-gray-500 dark:hover:text-gray-200"
          >
            &larr;
          </Link>
          History: {task.name}
        </div>
        <Link to={`/task/${task.id}/edit`}>
          <button
            type="submit"
            className="p-2 rounded-md transition ease-in-out duration-150 bg-gray-600 hover:bg-gray-500 text-gray-200"
          >
            Edit task
          </button>
        </Link>
      </div>
      {task.history.length > 0 ? (
        <ol>
          {task.history.map((h) => (
            <li
              className="py-2 px-4 mx-auto mb-4 bg-white dark:bg-gray-200 rounded-md shadow-md flex flex-row items-center"
              key={h.id}
            >
              <div className="flex flex-1 flex-col">
                <div className="text-sm text-gray-800">
                  {new Intl.DateTimeFormat(navigator.language, {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(h.completed_at))}
                </div>
              </div>
              <Link to={`/task/${task.id}/history/${h.id}/edit`}>
                <button className="p-2 rounded-md transition ease-in-out duration-150 bg-gray-600 hover:bg-gray-500 text-gray-200">
                  Edit
                </button>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mb-4 text-black dark:text-gray-400">
          Never completed
        </div>
      )}
      <Form method="post" action="complete">
        <button
          type="submit"
          className="p-2 rounded-md transition ease-in-out duration-150 bg-indigo-500 hover:bg-indigo-400 text-white"
        >
          Complete task
        </button>
      </Form>
    </div>
  );
};
