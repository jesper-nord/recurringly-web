import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Start, loader as rootLoader } from './pages/Start';
import { CreateTask, action as createAction } from './pages/CreateTask';
import { action as completeAction } from './pages/CompleteTask';
import { action as deleteAction } from './pages/DeleteTask';
import { Task, loader as taskLoader } from './pages/Task';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
    loader: rootLoader,
  },
  {
    path: '/task',
    element: <CreateTask />,
    action: createAction,
  },
  {
    path: '/task/:taskId',
    element: <Task />,
    loader: taskLoader,
    children: [
      {
        path: '/task/:taskId/complete',
        action: completeAction,
      },
      {
        path: '/task/:taskId/destroy',
        action: deleteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
