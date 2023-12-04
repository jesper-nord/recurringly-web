import { format } from 'date-fns';
import { fetchTask } from '../../http';
import { Form, redirect, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  const task = await fetchTask(params.taskId);
  return { task };
}

export const Task = () => {
  const { task } = useLoaderData();

  if (!task) {
    return redirect('/tasks');
  }

  return (
    <div>
      <div className="text-xl font-medium text-black dark:text-white mb-6">
        {task.name}: history
      </div>
      {task.history.length > 0 ? (
        <ol>
          {task.history.map((h) => (
            <li
              className="p-4 mx-auto mb-4 bg-white dark:bg-gray-200 rounded-md shadow-md flex flex-row items-center"
              key={h.id}
            >
              <div className="flex flex-1 flex-col">
                <div className="text-sm text-gray-800">
                  {task.history.length > 0
                    ? format(new Date(h.completed_at), 'Pp')
                    : 'Never completed'}
                </div>
              </div>
              <Form
                method="post"
                action={`history/${h.id}/destroy`}
                onSubmit={(event) => {
                  if (
                    !confirm(
                      'Please confirm you want to delete this task history entry',
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button
                  type="submit"
                  className="bg-gray-600 rounded-md p-2 text-gray-200"
                >
                  Delete entry
                </button>
              </Form>
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
          className="bg-gray-600 rounded-md p-2 text-gray-200"
        >
          Complete task
        </button>
      </Form>
      <Form
        method="post"
        action="destroy"
        onSubmit={(event) => {
          if (!confirm('Please confirm you want to delete this task')) {
            event.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          className="bg-gray-600 rounded-md p-2 text-gray-200"
        >
          Delete task
        </button>
      </Form>
    </div>
  );
};
