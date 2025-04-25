import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });
        setTask(res.data);
      } catch (err) {
        console.error('Error fetching task:', err);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      navigate('/dashboard/my-tasks');
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
      {task && (
        <>
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">{task.title}</h2>
          <p className="text-sm text-gray-700">Description: {task.description}</p>
          <p className="text-sm text-gray-700">Due Date: {task.dueDate}</p>
          <p className="text-sm text-gray-700">Priority: {task.priority}</p>
          <p className="text-sm text-gray-700">Category: {task.category}</p>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
          >
            Delete Task
          </button>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
