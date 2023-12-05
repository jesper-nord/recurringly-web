import { login, refresh } from '../../http';
import {
  Form,
  Link,
  isRouteErrorResponse,
  redirect,
  useRouteError,
} from 'react-router-dom';
import { clearTokens, getRefreshToken, saveTokens } from '../../util';

export async function loader() {
  const refresh_token = getRefreshToken();
  if (refresh_token) {
    try {
      const { tokens } = await refresh(refresh_token);
      saveTokens(tokens);
      return redirect('/tasks');
    } catch (e) {
      console.warn('invalid session', e);
      clearTokens();
    }
  }
  return null;
}

export async function action({ request }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  try {
    const { tokens } = await login(email, password);
    saveTokens(tokens);
  } catch (e) {
    throw new Response('invalid login', { status: e.response.status });
  }

  return redirect('/tasks');
}

export const Start = () => {
  return (
    <div className="flex flex-col h-full place-content-center">
      <Form method="post" className="flex flex-col">
        <input
          placeholder="Email"
          aria-label="Email"
          type="email"
          name="email"
          className="p-2 rounded-md mb-2"
        />
        <input
          placeholder="Password"
          aria-label="Password"
          type="password"
          name="password"
          className="p-2 rounded-md mb-2"
        />
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 rounded-md p-2 mt-4 text-gray-200 block"
        >
          Login
        </button>
      </Form>
      <Link to="/register" className="text-gray-200 hover:text-gray-400 mt-4">
        Register
      </Link>
      <LoginError />
    </div>
  );
};

export const LoginError = () => {
  const error = useRouteError();
  if (!error) {
    return null;
  }

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <div className="text-red-800 dark:text-red-400 mt-4">
        Invalid username/password
      </div>
    );
  }

  throw error;
};
