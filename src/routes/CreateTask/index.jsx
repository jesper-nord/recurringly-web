import { Form, Link, Outlet, redirect } from 'react-router-dom';
import { createTask } from '../../http';

export async function action({ request }) {
  const formData = await request.formData();
  const { name } = Object.fromEntries(formData);
  await createTask(name);
  return redirect('/tasks');
}

export const CreateTask = () => {
  return (
    <Form method="post">
      <div className="">
        <div className="text-xl font-medium text-black dark:text-white mb-6">
          <Link
            to="/tasks"
            className="mr-4 hover:text-gray-500 dark:hover:text-gray-200"
          >
            &larr;
          </Link>
          New task
        </div>
        <input
          placeholder="Task name"
          aria-label="Task name"
          type="text"
          name="name"
          required
          className="p-2 rounded-md"
        />
        <button
          type="submit"
          className="p-2 rounded-md transition ease-in-out duration-150 bg-indigo-500 hover:bg-indigo-400 text-white ml-4"
        >
          Create
        </button>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </Form>
  );
};
