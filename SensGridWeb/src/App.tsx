import{Routes,Route}from'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <Header title="Employee Management" subtitle="Manage Employees Easily." />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetail /></ProtectedRoute>} />
        <Route path="/employees/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
        <Route path="/employees/:id/edit/" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
