import axios from "axios";

const API_URL ="http://localhost:7071/api/employees";

//Get All employees
export async function getEmployees() {
    const response = await axios.get(API_URL);
    return response.data;
}

//Get employee by ID
export async function getEmployeeById(id: number) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

//create new employee
export async function createEmployee(employee: any) {
    const response = await axios.post(API_URL, employee);
    return response.data;
}

//update employee
export async function updateEmployee(id: number, employee: any) {
    const response = await axios.put(`${API_URL}/${id}`, employee);
    return response.data;
}

//delete employee
export async function deleteEmployee(id: number) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}
