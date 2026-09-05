import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees,deleteEmployee } from '../services/EmployeeService';

type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
};

function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // useEffect = Page_Load / OnInit
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                setError(`Failed to fetch employees. Please try again later.${error}`);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []); // [] means this effect runs only once when the component mounts

    if (loading) { return <p>Loading Employees...</p>; }
    if (error) { return <p style={{color:"red"}}>Error: {error}</p>; }

    async function DeleteEmployee(id: number) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter(emp => emp.id !== id));
            } catch (error) {
                setError(`Failed to delete employee. Please try again later.${error}`);
            }
        }
    
    async function fetchData() {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            setError(`Failed to fetch employees. Please try again later.${error}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button onClick={() => fetchData()}>Refresh</button>
            <h2>Employee List</h2>
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
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstname} {emp.lastname}</td>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                            <td>
                                <button onClick={() => navigate(`/employees/${emp.id}`)}>View</button>
                                <button onClick={() => DeleteEmployee(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;