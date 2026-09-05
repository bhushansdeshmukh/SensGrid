import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployees, deleteEmployee } from '../services/employeeService';

type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
};

type EmployeeState = {
    list: Employee[];
    loading: boolean;
    error: string | null;
};

const initialState: EmployeeState = {
    list: [],
    loading: false,
    error: null,
};

// Async thunk to fetching employees
export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async () => {
        const data = await getEmployees();
        return data;
    }
);

// Async thunk to delete an employee
export const deleteEmployeeThunk = createAsyncThunk(
    'employees/deleteEmployee',
    async (id: number) => {
        await deleteEmployee(id);
        return id; // Return the deleted employee's ID
    }
);

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(fetchEmployees.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch employees';
        });
        builder.addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
            state.list = state.list.filter((employee) => employee.id !== action.payload);
        });
    },
});

export default employeeSlice.reducer;