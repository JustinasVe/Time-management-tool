import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { UserContext } from "../../contexts/UserContextWrapper";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

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
        .then((res) => {
            if (res.status === 401) {
                throw new Error ('Incorrect email or password');
            }

            if (!res.ok) {
                throw new Error ('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            setUser(data);
            setIsLoading(false);
            setError('');
            navigate('/')
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }

    return (
        <>
            <form onSubmit={handleLogin} disabled={isLoading} >
                <Input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                {error && <div>{error}</div>}
                <Button>Login</Button>
            </form>
            <Link to="/register">Register</Link>
        </>
    )
}