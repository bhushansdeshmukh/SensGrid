import { useState, useEffect } from 'react';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};

function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);

    // useEffect = Page_Load / OnInit
    useEffect(() => {
        console.log("Component mounted: fetching employees...");
        // Mock data for now
        const mockData: Employee[] = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'Software Engineer' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'Product Manager' },
            { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', role: 'Designer' }
        ];
        setEmployees(mockData);
    }, []); // [] means this effect runs only once when the component mounts

    return (
        <div>
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
                            <td>{emp.firstName} {emp.lastName}</td>
                            <td>{emp.email}</td>
                            <td>{emp.role}</td>
                            <td>
                                <button onClick={() => console.log(`Viewing employee: ${emp.firstName} ${emp.lastName}`)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;