import {useParams} from 'react-router-dom';

function EmployeeDetail() {
    const { id } = useParams(); // router parameter
    return (
        <div>
            <h2>Employee Detail</h2>
            <p>Showing details for employee with ID: {id}</p>
        </div>
    );
}

export default EmployeeDetail;