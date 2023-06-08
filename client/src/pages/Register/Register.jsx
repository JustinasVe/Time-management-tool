import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })
        })
        .then((res) => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            navigate('/login');
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    };

    return (
        <>
            <form onSubmit={handleRegister} disabled={isLoading} >
                <Input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input
                    placeholder="Surname"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />
                <Input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                {error && <div>{error}</div>}
                <Button>Register</Button>
            </form>
            <Link to="/login">Login</Link>
        </>
    )
}