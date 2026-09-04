import Header from './components/Header';
//import Counter from './components/Counter';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';

function App() {
  return (
    <div>
      <Header title="Employee Management" subtitle="Manage Employees Easily." />
      <Login />
      <EmployeeList />
    </div>
  )
}

export default App
