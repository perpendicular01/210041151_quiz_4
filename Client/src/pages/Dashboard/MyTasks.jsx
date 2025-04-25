import { useState, useEffect } from 'react';

import axios from 'axios';

import { useAuth } from '../../hooks/useAuth';
import TaskCard from '../../components/TaskCard';

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">My Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
