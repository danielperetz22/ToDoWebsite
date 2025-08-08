
const statusColors = {
  done: 'bg-green-200 text-green-800',
  'not-done': 'bg-red-200 text-red-800',
};

const TaskItem = ({
  title,
  status,
}: {
  title: string;
  status: 'done' | 'not-done';
}) => {
  return (
    <div className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
      {title}
    </div>
  );
};

export default TaskItem;