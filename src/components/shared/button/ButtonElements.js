import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const SignInAndOutLink = styled(Link)`
    background-color: ${(props) => props.backgroundColor};
    color: var(--body);
    border-radius: 16px;
    padding: 8px 72px;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    font-weight: 300;

    &:focus {
        box-shadow: 0 0 0 0.1875rem var(--third);
    }
`;

export const ShowCryptoBtn = styled.button`
    background: none;
    padding: 8px 16px;
    border: 2px solid var(--primary);
    border-radius: 20px;
    outline: none;
    margin: 8px;
    cursor: pointer;
`
