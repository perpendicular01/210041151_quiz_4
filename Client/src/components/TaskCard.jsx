import { Link } from 'react-router-dom';

const TaskCard = ({ task, onDelete, onComplete }) => {
  const { _id, title, description, dueDate, priority, category, completed } = task;

  return (
    <div className="bg-white shadow rounded-xl p-4 border border-gray-200 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span
          className={`text-xs px-2 py-1 rounded ${
            completed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      <div className="text-sm text-gray-500 flex flex-wrap gap-4">
        <span>📅 {dueDate}</span>
        <span>🔥 Priority: {priority}</span>
        <span>📁 Category: {category}</span>
      </div>

      <div className="flex justify-end gap-2 mt-2 text-sm">
        <Link
          to={`/dashboard/task/${_id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View
        </Link>
        <Link
          to={`/dashboard/edit-task/${_id}`}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        {!completed && (
          <button
            onClick={() => onComplete(_id)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => onDelete(_id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
