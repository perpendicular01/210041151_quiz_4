import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard/Dashboard';
import MyTasks from '../pages/Dashboard/MyTasks';
import CreateTask from '../pages/Dashboard/CreateTask';
import TaskDetails from '../pages/Dashboard/TaskDetails';
import EditTask from '../pages/Dashboard/EditTask';
import AllUsers from '../pages/Dashboard/AllUsers';
import Home from '../pages/Home';

const Routes = () => {
    const { currentUser } = useAuth();

 
    return (
        <ReactRouterRoutes>

            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="my-tasks" element={<MyTasks />} />
                    <Route path="create-task" element={<CreateTask />} />
                    <Route path="tasks/:id" element={<TaskDetails />} />
                    <Route path="edit-task/:id" element={<EditTask />} />
                    {currentUser?.role === 'admin' && (
                        <Route path="all-users" element={<AllUsers />} />
                    )}
                </Route>
            </Route>
        </ReactRouterRoutes>
    );
};

export default Routes;

