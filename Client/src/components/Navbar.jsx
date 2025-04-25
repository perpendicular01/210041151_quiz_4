import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        TaskManager
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard/my-tasks" className="text-gray-700 hover:text-blue-600">
              My Tasks
            </Link>
            <Link to="/dashboard/create-task" className="text-gray-700 hover:text-blue-600">
              Create Task
            </Link>
            {user.role === 'admin' && (
              <Link to="/dashboard/all-users" className="text-gray-700 hover:text-blue-600">
                All Users
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
