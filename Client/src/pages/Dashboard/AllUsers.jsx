import { useState, useEffect } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">All Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between">
            <div>{user.email}</div>
            <div>{user.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
