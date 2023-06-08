import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
        })
        .catch((e) => {
            console.log(e)
        })
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button>Login</button>
            </form>
            <Link to="/register">Register</Link>
        </>
    )
}