import EMployeeForm from '../components/EmployeeForm';
import {getEmployeeById, updateEmployee} from '../services/employeeService';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EditEmployee() {
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState<any>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        async function fetchEmployee() {
            if (id) {
                const employeeData = await getEmployeeById(Number(id));
                setInitialValues(employeeData);
            }
        }
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (values: any) => {
            await updateEmployee(Number(id), values);
            navigate('/employees');
    };

    if (!initialValues) {
        return <p>Loading employee data...</p>;
    }

    return (
        <div>
            <h2>Edit Employee</h2>
            <EMployeeForm initialValues={initialValues} onSubmit={handleSubmit} />
            <button onClick={() => navigate('/employees')}>Cancel</button>
        </div>
    );
}

export default EditEmployee;