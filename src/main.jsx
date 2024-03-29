import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './error-page';
import { Root } from './routes/Root';
import {
  Start,
  action as loginAction,
  loader as loginLoader,
} from './routes/Start';
import { Register, action as registerAction } from './routes/Register';
import { Tasks, loader as tasksLoader } from './routes/Tasks';
import { Task, loader as taskLoader } from './routes/Task';
import { CreateTask, action as createAction } from './routes/CreateTask';
import {
  EditTask,
  action as editAction,
  loader as editLoader,
} from './routes/EditTask';
import { action as completeAction } from './routes/CompleteTask';
import { action as deleteTaskAction } from './routes/DeleteTask';
import { action as deleteHistoryAction } from './routes/DeleteTaskHistory';
import {
  EditTaskHistory,
  loader as editHistoryLoader,
  action as editHistoryAction,
} from './routes/EditTaskHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Start />,
            loader: loginLoader,
            action: loginAction,
            errorElement: <Start />,
          },
          {
            path: '/register',
            element: <Register />,
            action: registerAction,
            errorElement: <Register />,
          },
          {
            path: '/tasks',
            element: <Tasks />,
            loader: tasksLoader,
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
            ],
          },
          {
            path: '/task/:taskId/edit',
            element: <EditTask />,
            loader: editLoader,
            action: editAction,
            children: [
              {
                path: '/task/:taskId/edit/destroy',
                action: deleteTaskAction,
              },
            ],
          },
          {
            path: '/task/:taskId/history/:taskHistoryId/edit',
            element: <EditTaskHistory />,
            loader: editHistoryLoader,
            action: editHistoryAction,
            children: [
              {
                path: '/task/:taskId/history/:taskHistoryId/edit/destroy',
                action: deleteHistoryAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
