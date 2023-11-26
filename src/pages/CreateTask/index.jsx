import { Form, redirect } from 'react-router-dom';
import { createTask } from '../../http';

export async function action({ request }) {
  const formData = await request.formData();
  const { name } = Object.fromEntries(formData);
  await createTask(name);
  return redirect('/');
}

export const CreateTask = () => {
  return (
    <Form method="post">
      <p>
        <span>Task name</span>
        <input placeholder="Name" aria-label="Name" type="text" name="name" />
      </p>
      <button type="submit">Create</button>
    </Form>
  );
};
