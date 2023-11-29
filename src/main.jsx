import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Start, loader as rootLoader } from './routes/Start';
import { CreateTask, action as createAction } from './routes/CreateTask';
import { action as completeAction } from './routes/CompleteTask';
import { action as deleteTaskAction } from './routes/DeleteTask';
import { action as deleteHistoryAction } from './routes/DeleteTaskHistory';
import { Task, loader as taskLoader } from './routes/Task';

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
        action: deleteTaskAction,
      },
      {
        path: '/task/:taskId/history/:taskHistoryId/destroy',
        action: deleteHistoryAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
