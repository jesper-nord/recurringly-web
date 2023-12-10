import { format, formatRFC3339 } from 'date-fns';
import { editTaskHistory, fetchTask } from '../../http';
import { Form, Link, redirect, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  try {
    const task = await fetchTask(params.taskId);
    return {
      task,
      history: task.history.find((h) => h.id === params.taskHistoryId),
    };
  } catch {
    return redirect('/');
  }
}

export async function action({ params, request }) {
  const formData = await request.formData();
  const { completedAt } = Object.fromEntries(formData);
  const formatted = formatRFC3339(new Date(completedAt));

  await editTaskHistory(params.taskId, params.taskHistoryId, formatted);
  return redirect(`/task/${params.taskId}`);
}

export const EditTaskHistory = () => {
  const { task, history } = useLoaderData();

  if (!task || !history) {
    return redirect('/tasks');
  }

  const currentValue = format(
    new Date(history.completed_at),
    "yyyy-MM-dd'T'HH:mm",
  );

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="text-xl font-medium text-black dark:text-white">
          <Link to={`/task/${task.id}`} className="mr-4 hover:text-gray-200">
            &larr;
          </Link>
          Edit entry
        </div>
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (
              !confirm('Are you sure you want to delete this history entry?')
            ) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="p-2 rounded-md transition ease-in-out duration-150 bg-red-800 hover:bg-red-700 text-white"
          >
            Delete entry
          </button>
        </Form>
      </div>
      <Form method="post">
        <input
          placeholder="Completed at"
          aria-label="Completed at"
          defaultValue={currentValue}
          type="datetime-local"
          min="0"
          name="completedAt"
          required
          className="p-2 rounded-md"
        />
        <div className="flex mt-4">
          <button
            type="submit"
            className="p-2 rounded-md transition ease-in-out duration-150 bg-indigo-500 hover:bg-indigo-400 text-white"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};
