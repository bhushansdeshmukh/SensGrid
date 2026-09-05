import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

    // Event handler for form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // prevent page reload
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const token = response.data.token;
            // Store the token in localStorage or sessionStorage based on rememberMe
            localStorage.setItem('token', token); //store jwt
            navigate('/employees'); // Navigate to EmployeeList page after login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="rememberMe">Remember Me:</label>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={() => {
                    setEmail('');
                    setPassword('');
                    setRememberMe(false);
                }}>
                    Clear All
                </button>
            </form>
        </div>
    );
}

export default Login;