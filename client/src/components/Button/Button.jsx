import styled from 'styled-components';

const ButtonStyled = styled.button`
    border: 1px solid lightgrey;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px 20px;

    &:disabled {
        opacity: 0.5;
    }
`;

export const Button = (props) => {
    return <ButtonStyled {...props}/>
}