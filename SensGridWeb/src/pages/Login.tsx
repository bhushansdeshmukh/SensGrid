import {useState} from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Event handler for form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // prevent page reload
        // Perform login logic here
        console.log('Login Submitted:', email, password, rememberMe);
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