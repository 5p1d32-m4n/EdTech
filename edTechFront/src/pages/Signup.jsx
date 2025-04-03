import { useState } from "react";
import authService from "../api/auth.js";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await authService.signup({username,email, password});
            console.log(`token value: ${token}`);
            localStorage.setItem('token', token);
            navigate('/courses');
        } catch (err) {
            setError('Invalid Credentials');
        }
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            marginTop: '-50px'
        }}
        >
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '300px',
                padding: '2px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                background: '#fff',
            }}>
                <h2>Signup</h2>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    style={{ padding : '0.5rem' }}
                />
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="userName"
                    style={{ padding : '0.5rem' }}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    style={{ padding : '0.5rem' }}
                />
                <button type="submit">Signup</button>
                {err && <p style={{ color: 'red' }}>{err}</p>}

            </form>
        </div>
    )
}

export default Signup;