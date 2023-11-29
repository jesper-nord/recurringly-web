import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <div className="p-6 bg-slate-100 dark:bg-slate-800 w-screen h-screen">
      <Outlet />
    </div>
  );
};
