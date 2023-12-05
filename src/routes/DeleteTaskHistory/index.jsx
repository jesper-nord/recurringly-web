import { redirect } from 'react-router-dom';
import { deleteTaskHistory } from '../../http';

export async function action({ params }) {
  await deleteTaskHistory(params.taskId, params.taskHistoryId);
  return redirect(`/task/${params.taskId}`);
}
