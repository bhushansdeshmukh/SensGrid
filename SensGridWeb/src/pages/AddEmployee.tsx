import EmployeeForm from '../components/EmployeeForm';
import {createEmployee} from '../services/employeeService';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const navigate = useNavigate();

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        role: '',
    };

    const handleSubmit = async (values: any) => {
            await createEmployee(values);
            navigate('/employees');
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <EmployeeForm initialValues={initialValues} onSubmit={handleSubmit} />
            <button onClick={() => navigate('/employees')}>Cancel</button>
        </div>
    );
}

export default AddEmployee;