import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Start, loader as rootLoader } from './pages/Start';
import { CreateTask, action as createAction } from './pages/CreateTask';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
    loader: rootLoader,
  },
  {
    path: '/create',
    element: <CreateTask />,
    action: createAction,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
