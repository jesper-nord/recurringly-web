import { fetchTask } from '../../http';
import { Form, redirect, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  const task = await fetchTask(params.taskId);
  return { task };
}

export const Task = () => {
  const { task } = useLoaderData();

  if (!task) {
    return redirect('/');
  }

  return (
    <div>
      {task.name}
      {task.history.length > 0 ? (
        <ol>
          {task.history.map((h) => (
            <>
              <li key={h.id}>{h.completed_at}</li>
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
                <button type="submit">Delete</button>
              </Form>
            </>
          ))}
        </ol>
      ) : (
        'Task never completed'
      )}
      <Form method="post" action="complete">
        <button type="submit">Complete task</button>
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
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};
