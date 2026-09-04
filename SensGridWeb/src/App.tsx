import{Routes,Route}from'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';

function App() {
  return (
    <div>
      <Header title="Employee Management" subtitle="Manage Employees Easily." />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
      </Routes>
    </div>
  )
}

export default App
