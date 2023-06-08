import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styled from "styled-components";

const RegisterContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const FormStyled = styled.form`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;

const LinkStyled = styled(Link)`
    align-self: center;
`;

const ErrorStyled = styled.div`
    color: red;
    text-align: center;
`;

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
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister} disabled={isLoading} >
                <Input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                />
                <Input
                    placeholder="Surname"
                    onChange={(e) => setSurname(e.target.value)}
                    required
                    value={surname}
                />
                <Input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    value={email}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    value={password}
                />
                {error && <ErrorStyled>{error}</ErrorStyled>}
                <Button>Register</Button>
                <LinkStyled to="/login">Login</LinkStyled>
            </FormStyled>
        </RegisterContainer>
    )
}