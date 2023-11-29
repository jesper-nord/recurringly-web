import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="">
      <h1 className="text-2xl text-black dark:text-white mb-6">Oops!</h1>
      <p className="text-black dark:text-white mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-black dark:text-gray-400">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
