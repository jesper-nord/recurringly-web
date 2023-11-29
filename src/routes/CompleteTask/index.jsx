import { redirect } from 'react-router-dom';
import { completeTask } from '../../http';

export async function action({ params }) {
  await completeTask(params.taskId);
  return redirect(`/task/${params.taskId}`);
}
