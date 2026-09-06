import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { fetchEmployees, deleteEmployeeThunk } from '../store/employeeSlice';
import { useNavigate } from 'react-router-dom';
import { clearToken } from "../store/authSlice";

function EmployeeList() {
    const dispatch = useDispatch<AppDispatch>();
    const { list, loading, error } = useSelector((state: RootState) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const navigate = useNavigate();

    if (loading) { return <p>Loading Employees...</p>; }
    if (error) { return <p style={{ color: "red" }}>Error: {error}</p>; }

    return (
        <div>
            {/* <button onClick={() => fetchData()}>Refresh</button> */}
            <h2>Employee List</h2>
            <p>Total Employees: {list.length}</p>
            <button onClick={() => navigate('/employees/add')}>Add New Employee</button>
            <button onClick={() => {
                dispatch(clearToken());
                navigate('/');
            }}>Logout</button>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstname} {emp.lastname}</td>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                            <td>
                                <button onClick={() => navigate(`/employees/${emp.id}`)}>View</button>
                                <button onClick={() => navigate(`/employees/${emp.id}/edit`)}>Edit</button>
                                <button onClick={() => dispatch(deleteEmployeeThunk(emp.id))}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;