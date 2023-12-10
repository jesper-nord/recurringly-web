import { editTask, fetchTask } from '../../http';
import { Form, Link, redirect, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  try {
    const task = await fetchTask(params.taskId);
    return { task };
  } catch {
    return redirect('/');
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const { taskId, name } = Object.fromEntries(formData);
  await editTask(taskId, name);
  return redirect(`/task/${taskId}`);
}

export const EditTask = () => {
  const { task } = useLoaderData();

  if (!task) {
    return redirect('/tasks');
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="text-xl font-medium text-black dark:text-white">
          Edit {task.name}
        </div>
        <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm(`Are you sure you want to delete '${task.name}'?`)) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="p-2 rounded-md transition ease-in-out duration-150 bg-red-800 hover:bg-red-700 text-white"
          >
            Delete task
          </button>
        </Form>
      </div>
      <Form method="post">
        <input
          placeholder="Task name"
          aria-label="Task name"
          defaultValue={task.name}
          type="text"
          name="name"
          required
          className="p-2 rounded-md"
        />
        <input type="hidden" name="taskId" value={task.id} />
        <div className="flex mt-4">
          <button
            type="submit"
            className="p-2 rounded-md transition ease-in-out duration-150 bg-indigo-500 hover:bg-indigo-400 text-white"
          >
            Save
          </button>
          <Link to={`/task/${task.id}`}>
            <button className="p-2 rounded-md transition ease-in-out duration-150 bg-gray-600 hover:bg-gray-500 text-gray-200 ml-4">
              Cancel
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};
