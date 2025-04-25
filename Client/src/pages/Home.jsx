import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to TaskManager</h1>
      <p className="text-lg text-gray-700 mb-6">Manage your tasks effortlessly with our secure task management system.</p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
