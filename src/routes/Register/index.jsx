import { register } from '../../http';
import {
  Form,
  isRouteErrorResponse,
  redirect,
  useRouteError,
} from 'react-router-dom';
import { saveTokens } from '../../util';

export async function action({ request }) {
  const formData = await request.formData();
  const { username, password, repeatpassword } = Object.fromEntries(formData);

  if (password !== repeatpassword) {
    throw new Response('Passwords does not match', { status: 400 });
  }

  try {
    const { tokens } = await register(username, password);
    saveTokens(tokens);
  } catch (e) {
    throw new Response('', { status: e.response.status });
  }

  return redirect('/tasks');
}

export const Register = () => {
  return (
    <div className="flex flex-col h-full place-content-center">
      <Form method="post" className="flex flex-col">
        <input
          placeholder="Username"
          aria-label="Username"
          type="text"
          name="username"
          required
          className="p-2 rounded-md mb-2"
        />
        <input
          placeholder="Password"
          aria-label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
          className="p-2 rounded-md mb-2"
        />
        <input
          placeholder="Repeat password"
          aria-label="Repeat password"
          type="password"
          name="repeatpassword"
          required
          className="p-2 rounded-md mb-2"
        />
        <button
          type="submit"
          className="p-2 rounded-md transition ease-in-out duration-150 bg-indigo-500 hover:bg-indigo-400 text-white mt-4 block"
        >
          Register
        </button>
      </Form>
      <RegisterError />
    </div>
  );
};

const RegisterError = () => {
  const error = useRouteError();
  if (!error) {
    return null;
  }

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-red-800 dark:text-red-400 mt-4">
        {error.status === 403 ? 'User already registered' : error.data}
      </div>
    );
  }

  throw error;
};
